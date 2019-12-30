import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable()
export class RoutingService {
  private startup;
  mainRoute = `startup`;
  sid;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute //  private ActivatedRoute: any //  private apiService:ApiService
  ) {
    //  this.startup = this.apiService.localstorage.getStartup();
  }
  queryParams() {
    return this.route.snapshot.queryParams;
  }
  openViewValidator(key) {
    if (this.route.snapshot.queryParams.open) {
      return this.route.snapshot.queryParams.open.split(',').indexOf(key) >= 0;
    } else {
      return false;
    }
  }
  getStartup() {
    return this.startup;
  }
  changeUrlState(type, view, modalId, showId) {
    console.log('called');
    const urlParts = this.location.path(true).split('?');
    //  break the whole URL into URL & queryParams
    let updatedParams;
    let snapshot;
    if (urlParts.length > 1) {  // check if any queryParam currently exists in URL
      snapshot = this.queryToObject(urlParts[1]); // convert queryString to Object
    }
    if (type === 'show') {
      if (snapshot && snapshot.open) { //  check if any modal is open (or simply if open exists is queryParam)
        let viewParams = snapshot.open.split(','); // split the queryParams's open into array
        if (viewParams.includes(view)) { // check if the current view exists in open
          return;
        }
        if (showId) {
          viewParams += (',' + view + '&id=' + modalId);  // add the new view into queryParam
        } else {
          viewParams += (',' + view);  // add the new view into queryParam
        }
        const existingQueryParams = { ...snapshot };
        //  cloning current queryParam
        existingQueryParams.open = viewParams; //  updating queryParam
        updatedParams = this.objectToQuery(existingQueryParams); // converting object back to query
      } else {
        // tslint:disable-next-line:max-line-length
        const existingQueryParams = urlParts.length > 1 ? urlParts[1] + '&' : ''; // ternary to check whether any queryParam exist ( resolving &)
        if (showId) {
          updatedParams = existingQueryParams + 'open=' + view + '&id=' + modalId; // adding 'open' queryParam to URL
        } else {
          updatedParams = existingQueryParams + 'open=' + view;
        }
      }

    } else if (type === 'hide') {  // works if modal is gonna hide
      if (snapshot.open) {  // check if open exists (just to handle error)
        const viewParams = snapshot.open.split(','); // split the queryParams's open into array
        if (!viewParams.includes(view)) { // check if the current view exists in open
          return;
        }
        viewParams.splice(viewParams.indexOf(view), 1); // remove that view from ViewParam
        const existingQueryParams = { ...snapshot }; //  cloning current queryParam
        if (viewParams.length >= 1) { // check if viewParam is empty or not
          existingQueryParams.open = viewParams; // if not, add remaining to queryParam
        } else {
          delete existingQueryParams.open; //  else delete 'open' from queryParam
        }
        updatedParams = this.objectToQuery(existingQueryParams); // converting object back to query
        console.log(updatedParams);
      }
      if (snapshot.id) {
        let viewParams = updatedParams.split('id=');
        if (viewParams.length <= 1) {
          return;
        }
        const prevViewParam = viewParams[0];
        viewParams = viewParams[1];
        viewParams = viewParams.split(',');
        viewParams.splice(viewParams.indexOf(modalId), 1);
        console.log(viewParams);
        if (viewParams.length > 0) {
          updatedParams = prevViewParam + '&id=' + viewParams;
          console.log(updatedParams);

        } else {
          updatedParams = prevViewParam;
        }
      }
    } else {
      // else block here
    }
    console.log(updatedParams);
    this.location.replaceState(urlParts[0], updatedParams); // updating the URL
  }

  //  https:// stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
  objectToQuery(obj) {
    const str = [];
    if (obj) {
      for (const p in obj) {

        if (obj.hasOwnProperty(p)) {
          str.push(p + '=' + obj[p]);
        }
      }
    }

    return str.join('&');
  }

  //  https:// stackoverflow.com/questions/11557526/deserialize-query-string-to-json-object
  queryToObject(queryString) {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1];
    }
    const pairs = queryString.split('&');
    const result: any = {};
    pairs.forEach(function (pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
  }

  //  changeUrlAtOnModalOpen(type, page, modal, mid) {
  //    if (type === 'open') {
  //      if (this.startup) {
  //        window.history.replaceState(undefined, undefined, `#/${this.mainRoute}/${this.startup._id}/${page}/${modal}/${mid}`)
  //      } else {
  //        window.history.replaceState(undefined, undefined, `#/${page}?open=forgotPassword`)
  //      }

  //    } else if (type === 'close') {
  //      window.history.replaceState(undefined, undefined, `#/${this.mainRoute}/${this.startup._id}/${page}`)
  //    }
  //  }
  changeUrlAtPitchdeck(page, tab, pdid, tabName, vid) {
    window.history.replaceState(
      undefined,
      undefined,
      `#/${this.mainRoute}/${
      this.startup._id
      }/${page}/${tab}/${pdid}/${tabName}/${vid}`
    );
  }
  generateUrlforPwLink(page, tab, tabName, pid, vpid) {
    const link = `/${this.mainRoute}/${
      this.startup._id
      }/${page}/${tab}/${pid}/${tabName}/${vpid}`;
    return link;
  }
  navigateTo(url: Array<String>) {
    this.router.navigate(url);
  }
}
