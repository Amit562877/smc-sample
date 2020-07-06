import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
    constructor() { }
    transform(strdata: any, key) {
        const dummyarr = [];
        strdata.forEach(element => {
            element[key] = capitalize(element[key]);
            dummyarr.push(element);
        });
        return dummyarr;
    }
}
function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, (a) => { return a.toUpperCase(); });
};


@Pipe({
    name: 'rolepermissionobj'
})
export class RolePermissionPipe implements PipeTransform {

    transform(arr: any, arr2: any, arr3: any): any {
        const datalist: any = [];
        arr.forEach(element => {
            const objdata: any = {};
            objdata.permissionid = element.id;
            const data = arr2.mp.filter(el => el.permissionid === element.id);
            if (data.length === 0) {
                objdata.isdisabled = true;
            } else {
                objdata.isdisabled = false;
            }
            if (arr3.length > 0) {
                const datamain: any = arr3.filter(el => el.id === arr2.id);
                const data1 = (datamain.length > 0) ? datamain[0].rp.filter(el => el.permissionid === element.id) : [];
                objdata.isselected = (data1.length > 0) ? true : false;
            } else {
                objdata.isselected = false;
            }
            datalist.push(objdata);
        });
        return datalist;
    }
}

@Pipe({
    name: 'advancepermissionobj'
})
export class AdvacenPermissionPipe implements PipeTransform {

    transform(arr: any, arr2: any, arr3: any, adpermission: any): any {
        const datalist: any = [];
        arr.forEach(element => {
            const objdata: any = {};
            objdata.permissionid = element.id;
            if (arr3.length > 0) {
                const datamain: any = arr3.filter(el => el.id === arr2.id);
                const data1 = (datamain.length > 0) ? datamain[0].rp.filter(el => el.permissionid === element.id) : [];
                objdata.isdisabled = (data1.length > 0) ? true : false;
                objdata.isselected = (data1.length > 0) ? true : false;
            }

            const data = arr2.mp.filter(el => el.permissionid === element.id);
            if (data.length === 0) {
                objdata.isdisabled = true;
            } else if (!objdata.isdisabled) {
                objdata.isdisabled = false;
            }

            if (adpermission.length > 0 && !objdata.isselected) {
                const datamain: any = adpermission.filter(el => el.id === arr2.id);
                const data1 = (datamain.length > 0) ? datamain[0].ap.filter(el => el.permissionid === element.id) : [];
                objdata.isselected = (data1.length > 0) ? true : false;
            } else if (!objdata.isselected) {
                objdata.isselected = false;
            }
            datalist.push(objdata);
        });
        return datalist;
    }
}
@Pipe({
    name: 'menupermissionobj'
})
export class MenuPermissionPipe implements PipeTransform {

    transform(arr: any, arr2: any, arr3: any): any {
        const datalist: any = [];
        arr.forEach(element => {
            const objdata: any = {};
            objdata.permissionid = element.id;
            const pdata = (arr3.length > 0) ? arr3.filter(el => el.id === arr2.id) : [];
            const data = (pdata.length > 0) ? pdata[0].mp.filter(el => el.permissionid === element.id) : [];
            if (data.length === 0) {
                objdata.isselected = false;
            } else if (!objdata.isdisabled) {
                objdata.isselected = true;
            }
            datalist.push(objdata);
        });
        return datalist;
    }
}

@Pipe({
    name: 'submenucount'
})
export class SubMenuCountPipe implements PipeTransform {

    transform(arr: any, parentid: any): any {
        return (arr.filter(el => el.parentid === parentid).length > 0) ? true : false;
    }
}
