import type { IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";

export type ServiceSettingType = {
  service: IDirectoryLocationService | undefined;
  employee: IDirectoryLocationEmployee | undefined;
  date: string | undefined;
  time: string | undefined;
}
