import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import type { UserRole } from "../../interface";
import { ApiClientError, formatApiErrorForDisplay } from "../../services/httpClient";
import { registerUser } from "../../services/api";
import { canCreateUsers, getAssignableRoles } from "../../utils/roles";
import * as S from "./styles";

interface TeamFormValues {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const INITIAL_FORM_VALUES: TeamFormValues = {
  name: "",
  email: "",
  password: "",
  role: "DEVELOPER",
};

const getRoleHelperText = (role: UserRole | null | undefined) => {
  if (role === "ADMIN") {
    return "Admins can create Admin, Leader, and Developer accounts.";
  }

  if (role === "LEADER") {
    return "Leaders can manage developers through the backend hierarchy, but they no longer create new accounts.";
  }

  return "This account cannot create new users.";
};

const InternalTeam: React.FC = () => {
  const { user } = useContext(AuthContext);
  const currentUserRole = user?.role;
  const assignableRoles = getAssignableRoles(currentUserRole);
  const canOpenCreateFlow = canCreateUsers(currentUserRole);

  const [formValues, setFormValues] = useState<TeamFormValues>(INITIAL_FORM_VALUES);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const nextAssignableRoles = getAssignableRoles(currentUserRole);
    const nextRole = nextAssignableRoles[0];

    if (nextRole) {
      setFormValues((currentValues) => ({
        ...currentValues,
        role: nextRole,
      }));
    }
  }, [currentUserRole]);

  const handleFieldChange = <K extends keyof TeamFormValues>(
    field: K,
    value: TeamFormValues[K],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "",
      }));
    }

    if (formMessage) {
      setFormMessage("");
    }
  };

  const resetForm = () => {
    setFormValues({
      ...INITIAL_FORM_VALUES,
      role: assignableRoles[0] ?? "DEVELOPER",
    });
    setFieldErrors({});
    setFormMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFieldErrors({});
    setFormMessage("");

    try {
      await registerUser(formValues);
      toast.success("User created successfully.");
      resetForm();
    } catch (error) {
      if (error instanceof ApiClientError) {
        setFieldErrors(error.fieldErrors ?? {});
        setFormMessage(
          formatApiErrorForDisplay(
            error,
            "We couldn't create this account right now. Please try again later.",
            { includeRequestId: true },
          ),
        );
      } else if (error instanceof Error) {
        setFormMessage(error.message);
      } else {
        setFormMessage(
          "We couldn't create this account right now. Please try again later.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.PageContainer>
      <S.HeaderCard>
        <div>
          <S.PageTitle>Team management</S.PageTitle>
          <S.PageSubtitle>
            Create internal accounts according to the current backend role rules.
          </S.PageSubtitle>
        </div>

        <S.RoleChip>{user?.role ?? "No role"}</S.RoleChip>
      </S.HeaderCard>

      <S.InfoCard>
        <S.InfoTitle>Permission summary</S.InfoTitle>
        <S.InfoText>{getRoleHelperText(user?.role)}</S.InfoText>
      </S.InfoCard>

      <S.FormCard>
        <S.SectionTitle>Create account</S.SectionTitle>

        {!canOpenCreateFlow ? (
          <S.StatusBox>
            Only Admin accounts can create new internal users now. Leader
            lifecycle actions are available in the backend, but this frontend
            still needs a directory/list endpoint before deactivate and permanent
            delete can be surfaced safely here.
          </S.StatusBox>
        ) : (
          <>
            {formMessage && <S.StatusBox $isError>{formMessage}</S.StatusBox>}

            <S.Form onSubmit={handleSubmit}>
              <S.FieldGrid>
                <S.FieldGroup>
                  <label htmlFor="team-name">Name</label>
                  <S.TextInput
                    id="team-name"
                    value={formValues.name}
                    onChange={(event) => handleFieldChange("name", event.target.value)}
                    required
                  />
                  {fieldErrors.name && (
                    <S.FieldError>{fieldErrors.name}</S.FieldError>
                  )}
                </S.FieldGroup>

                <S.FieldGroup>
                  <label htmlFor="team-email">Email</label>
                  <S.TextInput
                    id="team-email"
                    type="email"
                    value={formValues.email}
                    onChange={(event) => handleFieldChange("email", event.target.value)}
                    required
                  />
                  {fieldErrors.email && (
                    <S.FieldError>{fieldErrors.email}</S.FieldError>
                  )}
                </S.FieldGroup>
              </S.FieldGrid>

              <S.FieldGrid>
                <S.FieldGroup>
                  <label htmlFor="team-password">Password</label>
                  <S.TextInput
                    id="team-password"
                    type="password"
                    value={formValues.password}
                    onChange={(event) =>
                      handleFieldChange("password", event.target.value)
                    }
                    autoComplete="new-password"
                    required
                  />
                  {fieldErrors.password && (
                    <S.FieldError>{fieldErrors.password}</S.FieldError>
                  )}
                </S.FieldGroup>

                <S.FieldGroup>
                  <label htmlFor="team-role">Role</label>
                  <S.SelectInput
                    id="team-role"
                    value={formValues.role}
                    onChange={(event) =>
                      handleFieldChange("role", event.target.value as UserRole)
                    }
                    disabled={assignableRoles.length === 0}
                  >
                    {assignableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </S.SelectInput>
                  {fieldErrors.role && (
                    <S.FieldError>{fieldErrors.role}</S.FieldError>
                  )}
                </S.FieldGroup>
              </S.FieldGrid>

              <S.ActionRow>
                <S.PrimaryButton
                  type="submit"
                  disabled={isSubmitting || assignableRoles.length === 0}
                >
                  {isSubmitting ? "Creating..." : "Create user"}
                </S.PrimaryButton>
              </S.ActionRow>
            </S.Form>
          </>
        )}
      </S.FormCard>
    </S.PageContainer>
  );
};

export default InternalTeam;
