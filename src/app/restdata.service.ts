import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Device } from './types/Device';
import { Group } from './types/Group';
import { ShutterDevice } from './types/ShutterDevice';
import { SwitchDevice } from './types/SwitchDevice';
import { Configuration } from './app.constants';
import { GroupConfig } from './types/GroupConfig';
import { CommunicationObject } from './types/CommunicationObject';
 
@Injectable()
export class RestDataService {
 
    private actionUrl: string;
    private headers: Headers;
 
    constructor(private _http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'smarthab/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
 
    public GetDeviceList = (): Observable<Device[]> => {
        return this._http.get(this.actionUrl+'devices')
            .map((response: Response) => <Device[]>response.json())
            .catch(this.handleError);
    }

    public GetGroupList = (): Observable<Group[]> => {
        return this._http.get(this.actionUrl+'groups')
            .map((response: Response) => <Group[]>response.json())
            .catch(this.handleError);
    }

    public GetShutterDeviceConfig = (id: number): Observable<ShutterDevice> => {
        return this._http.get(this.actionUrl+'config/shutter?device='+id)
            .map((response: Response) => <ShutterDevice>response.json())
            .catch(this.handleError);
    }

    public UpdateShutterDevieConfig = (id: number, newConfig: ShutterDevice): Observable<Response> => {
        return this._http.put(this.actionUrl +'config/shutter?device='+id, JSON.stringify(newConfig), { headers: this.headers } )
            .catch(this.handleStrError);
    }

    public GetSwitchDeviceConfig = (id: number): Observable<SwitchDevice> => {
        return this._http.get(this.actionUrl+'config/switch?device='+id)
            .map((response: Response) => <ShutterDevice>response.json())
            .catch(this.handleError);
    }

    public UpdateSwitchDevieConfig = (id: number, newConfig: SwitchDevice): Observable<Response> => {
        return this._http.put(this.actionUrl +'config/switch?device='+id, JSON.stringify(newConfig), { headers: this.headers } )
            .catch(this.handleStrError);
    }

    public GetGroupConfiguration = (id: number): Observable<GroupConfig[]> => {
        return this._http.get(this.actionUrl+'groupConfig?group='+id)
            .map((response: Response) => <GroupConfig[]>response.json())
            .catch(this.handleError);
    }

    public UpdateGroupConfiguration = (id: number, newConfig: GroupConfig[]): Observable<Response> => {
        return this._http.put(this.actionUrl +'config/groupConfig?group='+id, JSON.stringify(newConfig), { headers: this.headers } )
            .catch(this.handleStrError);
    }

    public GetCompatibleComObjects = (id: number): Observable<CommunicationObject[]> => {
        return this._http.get(this.actionUrl+'compatibleComObjs?group='+id)
            .map((response: Response) => <CommunicationObject[]>response.json())
            .catch(this.handleError);
    }

 /*
    public GetSingle = (id: number): Observable<Device> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Device>response.json())
            .catch(this.handleError);
    }
 
    public Add = (itemName: string): Observable<Device> => {
        let toAdd = JSON.stringify({ ItemName: itemName });
 
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <Device>response.json())
            .catch(this.handleError);
    }
 

 
    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }
    */

    public handleStrError(error: Response) {
        console.error("Status="+error.status+" Msg="+error.text());
        return Observable.throw(error.text() || 'Server error');
    } 


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}