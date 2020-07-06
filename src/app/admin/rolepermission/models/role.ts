export class Role {
    id = 0;
    name = '';
    createdby = 1;
    updatedby = 1;
    isactive = true;
    isdeleted = false;
}
export class Permission {
    id = 0;
    name = '';
    createdby = 1;
    updatedby = 1;
    isactive = true;
    isdeleted = false;
}
export class Menu {
    id = 0;
    name = '';
    displyname = '';
    path = '';
    icon = '';
    sequence = 0;
    parentid = 0;
    createdby = 1;
    updatedby = 1;
    isactive = true;
    isdeleted = false;
    canbind = false;
}
