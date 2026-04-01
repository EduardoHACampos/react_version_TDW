import React from "react";
import * as S from "./styles";

import combat1Gif from "../../assets/TheDarkWest_Combat1.webm";
import combat2Gif from "../../assets/TheDarkWest_Combat2.webm";
import townGif from "../../assets/TheDarkWest_Town.webm";
import witchGif from "../../assets/TheDarkWest_Witch1.webm";

const About: React.FC = () => {
  return (
    <S.AboutContainer>
      <S.AboutWrapper>
        
        {/* ABOUT THIS GAME SECTION */}
        <S.SectionBlock>
          <S.SectionHeader>About This Game</S.SectionHeader>
          
          <S.Paragraph>
            <strong>The Dark West</strong> is an Action RPG that challenges both your skill and sanity.
          </S.Paragraph>
          
          <S.GifImage 
            src={combat1Gif} 
            aria-label="Fast paced action combat in The Dark West" 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
          
          <S.Paragraph>
            Face a cursed western frontier, where faith and damnation war beneath an eternal dusk.
          </S.Paragraph>

          <S.GifImage 
            src={townGif} 
            aria-label="A gloomy, cursed western town" 
            autoPlay 
            loop 
            muted 
            playsInline 
          />

          <S.Paragraph>
            Your choices will carve a path through a world where greed unearthed something fouler than death.
          </S.Paragraph>

          <S.GifImage 
            src={witchGif} 
            aria-label="Occult rituals and witchcraft" 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
          <S.GifImage 
            src={combat2Gif} 
            aria-label="Intense gunfight and magic combat" 
            autoPlay 
            loop 
            muted 
            playsInline 
          />
          
        </S.SectionBlock>

        {/* EARLY ACCESS SECTION */}
        <S.EarlyAccessBox>
          <S.EarlyAccessHeader>
            <h3>Early Access Game</h3>
            <p>Get instant access and start playing; get involved with this game as it develops.</p>
          </S.EarlyAccessHeader>

          <S.QAItem>
            <h4>Why Early Access?</h4>
            <p>“The Dark West is an action RPG featuring tons of loot and powerful character builds, and community feedback is essential before a full release. Loot balance, optimizing enemy difficulty, and refining the in-game economy are key aspects of our development process. Launching without an early access phase would risk compromising the player experience, and that is our top priority. By collaborating with the community, we can refine and enhance the game together, ensuring it delivers a deep and rewarding ARPG experience.”</p>
          </S.QAItem>

          <S.QAItem>
            <h4>Approximately how long will this game be in Early Access?</h4>
            <p>“Our early Early Access will be launched this year, and the runtime for it will be of one year duration.”</p>
          </S.QAItem>

          <S.QAItem>
            <h4>How is the full version planned to differ from the Early Access version?</h4>
            <p>“Our plan is to add five acts, multiple classes, dynamic systems such as crafting and skill trees and a unique and innovative endgame.”</p>
          </S.QAItem>

          <S.QAItem>
            <h4>What is the current state of the Early Access version?</h4>
            <p>“The Early Access version will give everything you need to enjoy The Dark West as it is meant to be played. That will include multiple acts, bosses, fully functioning systems such as crafting.”</p>
          </S.QAItem>

          <S.QAItem>
            <h4>Will the game be priced differently during and after Early Access?</h4>
            <p>“Pricing for the full release hasn't been finalized yet.”</p>
          </S.QAItem>

          <S.QAItem>
            <h4>How are you planning on involving the Community in your development process?</h4>
            <p>“You can do your part and leave your feedback on our discord, we are always listening and looking for improvements to make this the best ARPG.”</p>
          </S.QAItem>
        </S.EarlyAccessBox>

      </S.AboutWrapper>
    </S.AboutContainer>
  );
};

export default About;