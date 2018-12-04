import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Device } from './types/Device';
import { Group } from './types/Group';
import { Scene } from './types/Scene';
import { ShutterDevice } from './types/ShutterDevice';
import { SwitchDevice } from './types/SwitchDevice';
import { Configuration } from './app.constants';
import { GroupConfig } from './types/GroupConfig';
import { SceneConfig } from './types/SceneConfig';
import { CommunicationObject } from './types/CommunicationObject';
import { RequestOptions } from '@angular/http';
 
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

    public AddGroup = (groupName:string): Observable<Response> => {
        var newGroup:Group = new Group();
        newGroup.name = groupName;
        return this._http.put(this.actionUrl +'groups', JSON.stringify(newGroup), { headers: this.headers } )
        .catch(this.handleStrError);
    }

    public GetSceneList = (): Observable<Scene[]> => {
        return this._http.get(this.actionUrl+'scenes')
            .map((response: Response) => <Scene[]>response.json())
            .catch(this.handleError);
    }

    public AddScene = (sceneName:string): Observable<Response> => {
        var newScene:Scene = new Scene();
        newScene.name = sceneName;
        return this._http.put(this.actionUrl +'scenes', JSON.stringify(newScene), { headers: this.headers } )
        .catch(this.handleStrError);
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
        return this._http.put(this.actionUrl +'groupConfig?group='+id, JSON.stringify(newConfig), { headers: this.headers } )
            .catch(this.handleStrError);
    }

    public GetCompatibleGroupObjects = (id: number): Observable<CommunicationObject[]> => {
        return this._http.get(this.actionUrl+'compatibleGroupObjs?group='+id)
            .map((response: Response) => <CommunicationObject[]>response.json())
            .catch(this.handleError);
    }

    public GetCompatibleSceneObjects = (id: number): Observable<CommunicationObject[]> => {
        return this._http.get(this.actionUrl+'compatibleSceneObjs?scene='+id)
            .map((response: Response) => <CommunicationObject[]>response.json())
            .catch(this.handleError);
    }
    public GetSceneConfiguration = (id: number): Observable<SceneConfig[]> => {
        return this._http.get(this.actionUrl+'sceneConfig?scene='+id)
            .map((response: Response) => <SceneConfig[]>response.json())
            .catch(this.handleError);
    }

    public UpdateSceneConfiguration = (id: number, newConfig: SceneConfig[]): Observable<Response> => {
        return this._http.put(this.actionUrl +'sceneConfig?scene='+id, JSON.stringify(newConfig), { headers: this.headers } )
            .catch(this.handleStrError);
    }

    public GetCompatibleDevices = (formData: FormData): Observable<Device[]> => {
        return this._http.put(this.actionUrl +'compatibleDevices', formData )
            .map((response: Response) => <Device[]>response.json())
            .catch(this.handleError);
    }

    public UpdateDevice = (formData: FormData): Observable<Response> => {
        return this._http.put(this.actionUrl +'update', formData )
            .catch(error => Observable.throw(error));
    }

    public handleStrError(error: Response) {
        console.error("Status="+error.status+" Msg="+error.text());
        return Observable.throw(error.text() || 'Server error');
    } 

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}