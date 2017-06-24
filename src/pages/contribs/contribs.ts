import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ViewController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'page-contribs',
    templateUrl: 'contribs.html'
})

export class Contribs {
    public contributors: Observable<any>;
    public contributorsLoaded: boolean = false;
    public appVersion: string;

    private unRegisterBackButtonAction: any;

    constructor(
        private http: Http,
        private viewCtrl: ViewController,
        private platform: Platform
    ) {
        this.contributors = this.getContributorsFromGithub();
        this.contributors.subscribe(() => this.contributorsLoaded = true);

        // Fix modal + sidemenu backbutton bug
        this.unRegisterBackButtonAction = platform.registerBackButtonAction(() => this.close(), 1);
    }

    private getContributorsFromGithub(): Observable<any> {
        return this.http
            .get('https://api.github.com/repos/alexetmanon/vliller/contributors')
            .map(response => response.json());
    }

    public close() {
        this.unRegisterBackButtonAction();
        this.viewCtrl.dismiss();
    }

    public openLink(link) {
        new InAppBrowser().create(link, '_system');
    }
}