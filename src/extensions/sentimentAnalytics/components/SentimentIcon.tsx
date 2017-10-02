import * as React from 'react';
import { override } from '@microsoft/decorators';

export interface ISentimentIconProps {
    score: number;
}

export default class SentimentIcon extends React.Component<ISentimentIconProps, {}> { 

    private LOADING_ICON: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEhElEQVRoQ+2ZzatWVRSHH9M+yFJBoYgEB2GDJkFQ4UAEERoYNIiimjhJGmr9AdGkUV/DqIlOlKxBkINAhJoIBkKDGiRSQiIOTCW171Qe2Dv2PXefc9Y+b++Fi3fBy7n3vnuvtX5r/dbaa5+7imUuq+bo/81C99zszE0xsAIgwo7WDKwDXgWeAXaNGGjJwGrgHuAP4N+I43lNK4BtwGdp837gkwFjLQDWAncAN4Dr8wSgbgEI5FfgyfSs2YwCuDNFXx2/zTsDGtkMnEwefwy82ROxCAAZYPR9Sh0BNEkrhbLyNwA/ylPAzxWrEQB3A3elvVJHCjXJVAAW8zeAzxPA8xMAyHmjr/wF/NnkeVo8FYDbXwTeT3oEIJBSxjJwL2D3cZ3RL9eHsdQA3A9cDWo4BjyWKCSVogB0XACKrfPvgD33LGqxNQDvAA8B7wKnRhSXbdVitqizDGWgtW0aVPdc7lKtC2ArcKhw4ivgPeD8ABBpJJ26bbUPgEVr8SpjbdPDbX2iWs7WpdKXWgaeSK3RLCjS6XD61KhlW5VKFrQHmwecUgNQts1/gN97AuPZoL4MNIM1SAs61VARv5zGBtOnmAUp8kXFqC3V8UIadYu5u1yn1iTnu23TzqTjuT7ca3fS8WqdjHUhnXf2EUwW6+KjQH0MsK76lRzXniAUC9aMDx5uYwCyJWvDKEuvLGbC+oh2rD5AZmRDwfM8D4UOtiiAbHwH8HrqUv5NEG+1hrpYb2t8oPjdaBuQ8ETaCiDb2gu8BLwy0qEi2KSN3UaeN5/GUwFEHFuSNSsAliTMA0ZyBmq9fcy3Z8cWNHxfdreGbZxaAdASroG1M2fgf/Jj6dXctl3ocWB3GiWaL+KdPD0M3AecTZebpjS2ZsDR+QXA2Uhx8jzYZHHhYqfSp9N06nh9Ln38OSRRAI63RnxnofV0moV8ziJbALMgGMUrptm4EFEaAaDTOp9n9F+Ao4G5P2I/r9H5R4AHi01XgDPAtSFFQwCkyR5gY6FAx49XZnRpYCS/BDQ8JDr5aApA95JiLQjE8TqLmRBIlVY1ADqs45nnKvoWOAIY/a44Se5LE6XrPh/w3ixmGv4IfN+zdlMCom4l14fUWiBdADr/drHCN246PsRzr5JmQPmgyIAjdxZvcFmMfg5OLZt5nbSyNsr6uAh8VyKoZcCbl5s+DfDcVBt9xTcYfrL0AfDCbhZ8mtGxO7RZkJ5ST+cF8Z/0Uci3BZH+LtVUbucw+j7HAPi97dizRBFAjZqln/5sfSwq6EgX6irKv+u4ABR5L/9L6ctAXuNLMSlroKTSJJkFgNSRQnaJDyvWxwDovCAUa+yHKQimAvBy70c5kA6erv0xAK6XRtLJdmoWIu9IF9iZAiDaNiMAbKvbU0Hb8bo0HE3KFADPpchZsFKn7+CKANDBsq1+PfAvqyqYVgC2steSpm7bnEIh99hOzYLZiLTVmShk0ZoBn0a/bJtTAbjPwFgPP7UWc2sGspP5f7pDHI1SKOswE0tSxKOFlRa0AojqnYlCLUaWPYAWsJPX3gLvzeQxGuTTnAAAAABJRU5ErkJggg==';
    private VERY_HAPPY_FACE_ICON: string = 'data:image/png;base64,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';
    private HAPPY_FACE_ICON: string = 'data:image/png;base64,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';
    private NEUTRAL_FACE_ICON: string = 'data:image/png;base64,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';
    private SAD_FACE_ICON: string = 'data:image/png;base64,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';
    private VERY_SAD_FACE_ICON: string = 'data:image/png;base64,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';
    
    @override
    public render(): React.ReactElement<{}> {
      const image = this._scoreToIcon(this.props.score);
      return (
        <img src={image} data-sentiment={this.props.score} />
      );
    }

    private _scoreToIcon(score: number): string {
        const percentage = score * 100;
    
        if (percentage <=0) return this.LOADING_ICON;
        if (percentage > 90) return this.VERY_HAPPY_FACE_ICON;
        if (percentage < 90 && percentage > 60) return this.HAPPY_FACE_ICON;
        if (percentage < 60 && percentage > 20) return this.NEUTRAL_FACE_ICON;
        if (percentage < 20 && percentage > 10) return this.SAD_FACE_ICON;
        if (percentage < 10) return this.VERY_SAD_FACE_ICON;
      }

}