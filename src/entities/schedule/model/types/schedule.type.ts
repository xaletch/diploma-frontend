export interface ISchedule {
  id: number;
  date: string;
  intervals: IScheduleIntervals[];
}

export interface IScheduleIntervals {
  start: string;
  end: string;
}

export interface IScheduleEmployeeParams {
  user_id: string;
  location_id: string;
}

export interface IScheduleCreateCredentials {
  params: {
    location_id: string;
  }
  body: IScheduleCreateBodyCredentials;
}

export interface IScheduleCreateBodyCredentials {
  date: string;
  intervals: IScheduleIntervals[];
  user_id?: string;
}

export interface IScheduleUser {
  id: string;
  name: string;
  phone: string;
  position: string | null;
  is_banned: boolean;
}

export interface IScheduleDetail extends ISchedule {
  location_id: string;
  user: IScheduleUser;
}

export interface IScheduleDetailCredentials {
  user_id: string;
  schedule_id: number;
}

export interface IScheduleCredentials {
  params: {
    location_id: string;
  }
  body: {
    user_id: string;
    schedule_id: number;
  }
}

export interface IScheduleUpdateCredentials {
  params: {
    location_id: string;
    schedule_id: number;
  }
  body: IScheduleCreateBodyCredentials;
}

export interface IScheduleUpdateResponse {
  id: number;
  date: string;
}
