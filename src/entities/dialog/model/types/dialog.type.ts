
/**
  ===== DIALOG NAMES ======
**/
export type DialogNames = 

  /** ===== СОТРУДНИКИ ===== **/
  "delete_employee";

/**
  ===== DIALOG DATA =====
**/
export type DialogDataMap = {
  TEST: undefined;

  /** ===== СОТРУДНИКИ ===== **/
  delete_employee: {
    employee_id: string;
  };
}

/**
  ===== DIALOG UNION =====
**/
export type DialogUnion = 
  | { name?: undefined, data?: undefined }
  | { name: "delete_employee", data: DialogDataMap["delete_employee"] };

export type DialogData<T extends DialogNames> = DialogDataMap[T];
