import type { IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";

export type ServiceSettingType = {
  service: IDirectoryLocationService | undefined;
  employee: IDirectoryLocationEmployee | undefined;
}
