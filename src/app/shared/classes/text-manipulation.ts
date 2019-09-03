import { Styles } from '../enums/styles.enum';
import { TextService } from '../services/text-service/text.service';
import { promise } from 'protractor';

export class TextManipulation {
    public lenght: number;
    public lStart: number;
    public lEnd: number;
    public textSelected: string;
    public entiredText: string;
    public etStart: number;
    public etEnd: number;
    public textService: TextService;

    public tobold(text: string): string {
        const bold = Styles.bold + text + Styles.ebold;
        return this.etStart + bold + this.etEnd;
    }

    public toItalic(text: string): string {
        const italic = Styles.italic + text + Styles.eitalic;
        return this.etStart + italic + this.etEnd;
    }
    public toUnderline(text: string): string {
        const underline = Styles.underline + text + Styles.eunderline;
        return this.etStart + underline + this.etEnd;
    }
    public normal(text: string): string {
        return this.etStart + ' ' + text + ' ' + this.etEnd;
    }
    public synonyms(word: string) {
        this.textService.dataMuse(word).then(function (result) {
            return result;
        });

    }
}

