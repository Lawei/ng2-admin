import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Device } from '../data/Device';
import { Group } from '../data/Group';
import { Scene } from '../data/Scene';
import { ShutterDevice } from '../data/ShutterDevice';
import { SwitchDevice } from '../data/SwitchDevice';
import { Configuration } from '../../app.constants';
import { GroupConfig } from '../data/GroupConfig';
import { SceneConfig } from '../data/SceneConfig';
import { CommunicationObject } from '../data/CommunicationObject';

@Injectable()
export class RestDataService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private _http: HttpClient, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl + 'smarthab/';
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
    }

    public GetDeviceList = (): Observable<Device[]> => {
        return this._http.get(this.actionUrl + 'devices', { observe: 'response' })
            .map((response: HttpResponse<Device[]>) => response.body)
            .catch(this.handleError);
    }

    public GetGroupList = (): Observable<Group[]> => {
        return this._http.get(this.actionUrl + 'groups')
            .map((response: HttpResponse<Group[]>) => response.body)
            .catch(this.handleError);
    }

    public AddGroup = (groupName: string): Observable<HttpResponse<Group>> => {
        const newGroup: Group = new Group();

        newGroup.name = groupName;
        return this._http.put<Group>(this.actionUrl + 'groups', newGroup, { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetSceneList = (): Observable<Scene[]> => {
        return this._http.get(this.actionUrl + 'scenes')
            .map((response: HttpResponse<Scene[]>) => response.body)
            .catch(this.handleError);
    }

    public AddScene = (sceneName: string): Observable<HttpResponse<Scene>> => {
        const newScene: Scene = new Scene();
        newScene.name = sceneName;
        return this._http.put<Scene>(this.actionUrl + 'scenes', newScene, { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetShutterDeviceConfig = (id: number): Observable<ShutterDevice> => {
        return this._http.get(this.actionUrl + 'config/shutter?device=' + id)
            .map((response: HttpResponse<ShutterDevice>) => response.body)
            .catch(this.handleError);
    }

    public UpdateShutterDevieConfig = (id: number, newConfig: ShutterDevice):
        Observable<HttpResponse<ShutterDevice>> => {
        return this._http.put<ShutterDevice>(this.actionUrl + 'config/shutter?device=' + id, newConfig,
            { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetSwitchDeviceConfig = (id: number): Observable<SwitchDevice> => {
        return this._http.get(this.actionUrl + 'config/switch?device=' + id)
            .map((response: HttpResponse<SwitchDevice>) => response.body)
            .catch(this.handleError);
    }

    public UpdateSwitchDevieConfig = (id: number, newConfig: SwitchDevice):
        Observable<HttpResponse<SwitchDevice>> => {
        return this._http.put<SwitchDevice>(this.actionUrl + 'config/switch?device=' + id, newConfig,
            { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetGroupConfiguration = (id: number): Observable<GroupConfig[]> => {
        return this._http.get(this.actionUrl + 'groupConfig?group=' + id)
            .map((response: HttpResponse<GroupConfig[]>) => response.body)
            .catch(this.handleError);
    }

    public UpdateGroupConfiguration = (id: number, newConfig: GroupConfig[]):
        Observable<HttpResponse<GroupConfig[]>> => {
        return this._http.put<GroupConfig[]>(this.actionUrl + 'groupConfig?group=' + id, newConfig,
            { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetCompatibleGroupObjects = (id: number): Observable<CommunicationObject[]> => {
        return this._http.get(this.actionUrl + 'compatibleGroupObjs?group=' + id)
            .map((response: HttpResponse<CommunicationObject[]>) => response.body)
            .catch(this.handleError);
    }

    public GetCompatibleSceneObjects = (id: number): Observable<CommunicationObject[]> => {
        return this._http.get(this.actionUrl + 'compatibleSceneObjs?scene=' + id)
            .map((response: HttpResponse<CommunicationObject[]>) => response.body)
            .catch(this.handleError);
    }
    public GetSceneConfiguration = (id: number): Observable<SceneConfig[]> => {
        return this._http.get(this.actionUrl + 'sceneConfig?scene=' + id)
            .map((response: HttpResponse<SceneConfig[]>) => response.body)
            .catch(this.handleError);
    }

    public UpdateSceneConfiguration = (id: number, newConfig: SceneConfig[]):
        Observable<HttpResponse<SceneConfig[]>> => {
        return this._http.put<SceneConfig[]>(this.actionUrl + 'sceneConfig?scene=' + id, newConfig,
            { observe: 'response', headers: this.headers })
            .catch(this.handleStrError);
    }

    public GetCompatibleDevices = (formData: FormData): Observable<Device[]> => {
        return this._http.put(this.actionUrl + 'compatibleDevices', formData)
            .map((response: HttpResponse<Device[]>) => response.body)
            .catch(this.handleError);
    }

    public UpdateDevice = (formData: FormData): Observable<HttpResponse<FormData>> => {
        return this._http.put<FormData>(this.actionUrl + 'update', formData, { observe: 'response' })
            .catch(error => Observable.throw(error));
    }

    public handleStrError(error: Response) {
        console.error('Status=' + error.status + ' Msg=' + error.text());
        return Observable.throw(error.text() || 'Server error');
    }

    private handleError(error: any) {
        const errMsg = error.message || 'ServerError';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
