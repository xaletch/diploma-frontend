import { Card, CardContent, CardHeader, CardTitle, ErrorForm, Form, ImagePicker, InputForm, SelectForm, Switch } from "@/shared/ui"
import { settingSchema, type SettingType } from "../model/schemas/setting.schema"
import { mockCurrency } from "@/pages/company/model/mock"
import { useSelector } from "react-redux"
import { accountSelector } from "@/entities/account"
import { Controller } from "react-hook-form"
import { PaletteIcon, PaperClipIcon } from "@/shared/icons"
import { cn } from "@/shared/utils"
// import SvgUsersGroup from "@/shared/icons/UsersGroup"
import SvgCustomer from "@/shared/icons/Customer"
import SvgCalendar from "@/shared/icons/Calendar"
import SvgBook from "@/shared/icons/Book"
import SvgDashboard from "@/shared/icons/Dashboard"
import { usePermissions } from "@/features/auth/model/hooks/permission.hook"
import { type PageType } from "@/entities/settings"
import Cast from "@/shared/icons/Cast"

const MENU = [
  {
    type: "DASHBOARD",
    label: "Дашбоард",
    icon: <SvgDashboard />,
  },
  {
    type: "BOOKINGS",
    label: "Записи",
    search: { limit: 20, sort: "new" },
    icon: <SvgBook />,
    permission: ["booking:*"],
  },
  {
    type: "ORDERS",
    label: "Платежи",
    search: { limit: 20, sort: "newest" },
    icon: <Cast />,
    permission: ["orders:*"],
  },
  {
    type: "CALENDAR",
    label: "Расписание",
    icon: <SvgCalendar />,
    permission: ["schedule:*"],
  },
  {
    type: "CUSTOMERS",
    label: "Клиенты",
    search: { limit: 20 },
    icon: <SvgCustomer />,
    permission: ["company-customers:*"],
  },
  // {
  //   type: "EMPLOYEES",
  //   label: "Сотрудники",
  //   search: { limit: 20 },
  //   icon: <SvgUsersGroup />,
  //   permission: ["employee:*", "employees:read"],
  // },
  {
    type: "SERVICES",
    label: "Услуги",
    search: { limit: 20 },
    icon: <PaletteIcon />,
    permission: ["service:*"],
  },
  // {
  //   to: "/notifications",
  //   label: "Уведомления",
  //   icon: <SvgNotification />,
  //   permission: [],
  // },
];

interface SystemSettingContentProps {
  onSubmit: (data: SettingType, role?: RoleType) => Promise<void>;
}

export const SystemSettingContent = ({ onSubmit }: SystemSettingContentProps) => {
  const { account } = useSelector(accountSelector);
  const { hasWildcard } = usePermissions();

  const defaultValues: SettingType = {
    name: account?.company?.name ?? "",
    currency: account?.company?.currency ?? "RUB",
    logo: null,
    pages: MENU
      .filter(item => {
        if (!item.permission) return true;
        const perms = Array.isArray(item.permission) ? item.permission : [item.permission];
        return perms.some(p => hasWildcard(p));
      })
      .map(item => {
        const saved = account?.settings?.pages?.find(p => p.page === item.type);
        return {
          page: item.type as PageType,
          is_visible: saved ? saved.is_visible : true,
        };
      }),
  };

  return (
    <div className="mt-8 space-y-6">
      <Form id="setting-save" onSubmit={(data) => onSubmit(data, account?.role)} schema={settingSchema} options={{ defaultValues }}>
        {({ formState, register, control, watch }) => {
          const pages = watch("pages");

          return (
            <>
              {account?.role === "owner" && (
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle>Общие настройки</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Controller
                        control={control}
                        name="logo"
                        render={({ field, fieldState }) => (
                          <div>
                            <ImagePicker
                              value={field.value}
                              className={cn(
                                "w-full h-41 bg-transparent border-dashed border-2 border-border hover:border-primary/60 duration-200",
                                account?.company?.logo ? "border-transparent hover:border-transparent" : ""
                              )}
                              onChange={field.onChange}
                              preview_url={account?.company?.logo}
                            >
                              <div className="flex items-center flex-col">
                                <PaperClipIcon width={32} height={32} />
                                <div className="font-bold text-base mt-1.5">Логотип</div>
                                <p className="font-normal text-xs text-primary/50">Рекомендуемый размер 200x200</p>
                              </div>
                            </ImagePicker>
                            {fieldState.error && <ErrorForm msg={fieldState.error.message} />}
                          </div>
                        )}
                      />
                      <InputForm
                        name="name"
                        id="name"
                        type="text"
                        inputSize="size_56"
                        register={register("name")}
                        error={formState.errors["name"]}
                        label="Наименование компании"
                        required
                      />
                      <SelectForm
                        name="currency"
                        control={control}
                        options={mockCurrency}
                        error={formState.errors["currency"]}
                        label="Валюта"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Настройка меню</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-5 gap-2.5">
                    {MENU.map((item, idx) => {
                      if (item.permission) {
                        const perms = Array.isArray(item.permission) ? item.permission : [item.permission];
                        if (!perms.some(p => hasWildcard(p))) return null;
                      }

                      const fieldIdx = pages?.findIndex(p => p.page === item.type);
                      if (fieldIdx === -1 || fieldIdx === undefined) return null;

                      return (
                        <div key={idx} className="bg-background p-4 rounded-2xl flex flex-col items-center justify-center gap-2.5">
                          <Controller
                            control={control}
                            name={`pages.${fieldIdx}.is_visible`}
                            render={({ field }) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            )}
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="size-5">{item.icon}</span>
                            <div className="text-sm font-medium">{item.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          );
        }}
      </Form>
    </div>
  );
}
