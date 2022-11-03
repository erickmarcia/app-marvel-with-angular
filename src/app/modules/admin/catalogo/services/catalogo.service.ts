import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { ImageThumbnail, ImageVariant } from 'src/app/models/image.model';
import { Category, MarvelRequestOptions } from 'src/app/models/request.model';
import { environment } from 'src/environments/environment';
import { MarvelCache, MarvelData, MarvelResponse } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

    // private apiKey = '4991f6b67c071092dbe67b36faae5681';
    // private apiSecretKey = 'f0de242ee98d75c3990f9ec4147faf73';
    private url: string = environment.apiUrl;
    private apiKey: string = environment.apiKey;
    private apiSecretKey: string = environment.apiSecretKey;

    // private apiMarvelURL = 'https://gateway.marvel.com:443/v1/public/characters?';
    private apiMarvelURL = 'https://gateway.marvel.com/v1/public/comics?ts=';

      URL_API = `https:gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.apiKey}&hash=${this.apiSecretKey}`;

    // private apiKey = '1a8fab12ee162e5aa8c8be71f9a9bc79';
    // private apiSecretKey = 'a34f57f4d14df0fc17c926a64c3ec7101cceba76';


    private textSubject: BehaviorSubject<string>
    public textObservable: Observable<string>

  private cache: MarvelCache = {
    characters: undefined,
    comics: undefined,
    creators: undefined,
    events: undefined,
    series: undefined,
    stories: undefined,
  }

  constructor(public http: HttpClient) {
      this.textSubject = new BehaviorSubject<string>('')
      this.textObservable = this.textSubject.asObservable()
  }

  emitText(chars: string){
    this.textSubject.next(chars)
  }

  public getComics(title: string, offset: string, limit: string) {
    // title = 'Avengers';
      let url =
        this.apiMarvelURL +  '1000&apikey=' + this.apiKey + '&hash=' + this.apiSecretKey + '&title=' + title +
        '&offset=' +
        offset +
        '&limit=' +
        limit;

        console.log(url);

      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }

      public getItems(offset: string, limit: string) {
    // title = 'Avengers';
      let url =
        this.apiMarvelURL +  '1000&apikey=' + this.apiKey + '&hash=' + this.apiSecretKey +
        '&offset=' +
        offset +
        '&limit=' +
        limit;

        console.log(url);

      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }


  public getEvents(title: string, offset: string, limit: string) {
        let url =
          this.apiMarvelURL +  '1000&apikey=' + this.apiKey + '&hash=' + this.apiSecretKey + '&title=' + title +
          '&offset=' +
          offset +
          '&limit=' +
          limit;

        return this.http.get(url).pipe(
          map((res: any) => {
            return res;
          }),
          retry(5)
        );
      }


  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
  return thumbnail && `${thumbnail.path}/${variant}.${thumbnail.extension}`;
}

// https://gateway.marvel.com:443/v1/public/characters?name=avengers&apikey=
// https://gateway.marvel.com:443/v1/public/characters?apikey=4991f6b67c071092dbe67b36faae5681&hash=f0de242ee98d75c3990f9ec4147faf73

 getData(category: Category, searchText: any, options?: MarvelRequestOptions): Observable<MarvelData | undefined> {
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }
//  searchText ='Avenger';
    // console.log('Entro ' + searchText);

    let url = `${this.url}${category}?ts=1000&apikey=${this.apiKey}&hash=${this.apiSecretKey}&name=${searchText}&offset=0&limit=100`;

    console.log(url);

    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }

    return this.http.get<MarvelResponse>(url).pipe(map(response => {
      if (response.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            this.cache[category] = response.data;
          }
        }

        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }

  // public findNameStartWith(offset: number, limit: number, startwith: string): Observable<Response>{
  //   let url = `${this.url}${category}?ts=1000&apikey=${this.apiKey}&hash=${this.apiSecretKey}&name=${searchText}&offset=0&limit=100`;

  // }

  getData2(category: Category, searchText: any, options?: MarvelRequestOptions): Observable<MarvelData | undefined> {
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }
//  searchText ='Avenger';
    // console.log('Entro ' + searchText);

    let url = `${this.url}${category}?ts=1000&apikey=${this.apiKey}&hash=${this.apiSecretKey}&name=${searchText}&offset=0&limit=100`;

    console.log(url);

    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }

    return this.http.get<MarvelResponse>(url).pipe(map(response => {
      if (response.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            this.cache[category] = response.data;
          }
        }

        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }


    public getCharacters(characters: string, searchText: any, offset: string, limit: string) {

       let url = `${this.url}${characters}?ts=1000&apikey=${this.apiKey}&hash=${this.apiSecretKey}&name=${searchText}&offset=${offset}&limit=${limit}`;

      // let url =
      //   this.apiMarvelURL +  '1000&apikey=' + this.apiKey + '&hash=' + this.apiSecretKey + '&title=' + title +
      //   '&offset=' +
      //   offset +
      //   '&limit=' +
      //   limit;

        console.log(url);

      return this.http.get(url).pipe(
        map((res: any) => {
          return res;
        }),
        retry(5)
      );
    }

}
