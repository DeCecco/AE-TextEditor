import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Datamuse } from '../../enums/datamuse.enum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // tslint:disable-next-line:max-line-length
    // todo: CORS
  })
};

@Injectable()
export class TextService {
  @Output() change: EventEmitter<number> = new EventEmitter();
  data: any;
  path = 'https://api.datamuse.com';
  slashPath = '/';
  constructor(private http: HttpClient) {
  }

  getMockText() {
    return new Promise<string>(function (resolve) {
      resolve('A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.');
    });
  }
  public actionStyle(data) {
    this.change.emit(data);
  }

  public dataMuse(toSearch: string) {
    const param = Datamuse.words + Datamuse.param + Datamuse.syn + Datamuse.eq;
    return this.http.get(this.path + this.slashPath + param + toSearch, httpOptions).toPromise();
  }
}
