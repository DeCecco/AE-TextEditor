import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextService } from '../../shared/services/text-service/text.service';
import { TextManipulation } from 'src/app/shared/classes/text-manipulation';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  public text: TextManipulation;
  // public styles: Styles;
  text$: Promise<string>;
  textSelected: string;
  datamuseResult: any;
  datamuseSelected: any;
  flag: boolean;
  constructor(private textService: TextService) {
    this.text = new TextManipulation();
    this.textSelected = 'A year ago I was in the audience at a gathering of designers ' +
      + ' in San Francisco. There were four designers on stage, and two of them worked for me. I was there ' +
      'to support them. The topic of design responsibility came up, possibly brought up by one of my designers, ' +
      'I honestly don’t remember the details. What I do remember is that at some point in the discussion I raised ' +
      'my hand and suggested, to this group of designers, that modern design problems were very complex. And we ought' +
      'to need a license to solve them.';
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
    this.textService.change.subscribe(req => {
      this.doAction(req);
    });
  }

  private selectedText(ev: any): void {
    this.text.lStart = ev.target.selectionStart;
    this.text.lEnd = ev.target.selectionEnd;
    this.text.lenght = ev.target.textLength;
    this.text.textSelected = ev.target.value.substr(this.text.lStart, this.text.lEnd - this.text.lStart);
    this.text.entiredText = ev.target.value;
    this.text.etStart = ev.target.value.substr(0, this.text.lStart);
    this.text.etEnd = ev.target.value.substr(this.text.lEnd, this.text.lenght);

  }
  public doAction(action: number): void {
    if (this.text.entiredText !== undefined) {
      switch (action) {
        case 1:
          this.validate(this.text.textSelected);
          this.textSelected = this.text.tobold(this.text.textSelected);
          break;
        case 2:
          this.textSelected = this.text.toItalic(this.text.textSelected);
          break;
        case 3:
          this.textSelected = this.text.toUnderline(this.text.textSelected);
          break;
        case 4:
          this.textService.dataMuse(this.text.textSelected).then((result: any) => {
            this.flag = true;
            if (result.length !== 0) {
              this.datamuseResult = result;
              this.datamuseSelected = this.text.textSelected;
            } else {
              this.datamuseResult = [{ 'word': this.text.textSelected, 'score': -1 }];
              this.datamuseSelected = this.text.textSelected;
            }
          }).catch(error => {
            console.error(error);
          });
          break;
        default:
          this.textSelected = this.text.normal(this.text.textSelected);
          break;
      }
    }
  }
  validate(text) {
    // to do:  delete repeated style
  }
  select() {
    this.text.textSelected = this.datamuseSelected;
    this.doAction(-1);
  }

}
