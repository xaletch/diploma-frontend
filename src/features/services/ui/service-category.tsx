import { useCreateServiceCategoryMutation } from "@/entities/services";
import { CloseIcon, PlusIcon } from "@/shared/icons";
import { Button, Input, SelectForm, type SelectOption } from "@/shared/ui"
import { getErrorMessage } from "@/shared/utils";
import { useEffect, useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { toast } from "sonner";

interface ServiceCategoryProps<F extends FieldValues> {
  name: Path<F>;
  control: Control<F>;
  categories?: { id: number; name: string }[];
  isLoadingCategory: boolean;
}


export const ServiceCategory = <F extends FieldValues>({ name, control, categories=[] }: ServiceCategoryProps<F>) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [localCategories, setLocalCategories] = useState(categories);
  
  const [createCategory, { isLoading }] = useCreateServiceCategoryMutation();

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const options: SelectOption[] = [
    ...localCategories.map(c => ({ id: c.id, value: String(c.name), label: c.name })),
    { id: 0, value: "0", label: "+ Создать категорию" },
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleCreate = async () => {
          if (!newCategory.trim()) return;
          try {
            const res = await createCategory({ name: newCategory }).unwrap();
            setLocalCategories(prev => [...prev, { id: res.id, name: res.name }]);
            field.onChange(String(res.name));
            setNewCategory("");
            setIsCreating(false);
          } catch (error) {
            toast.error(getErrorMessage(error));
          }
        };

        return (
          <div className="space-y-3">
            <SelectForm
              name={name}
              control={control}
              label="Категория"
              placeholder="Выберите категорию"
              options={options}
              onValueChange={(v) => {
                if (v === "0") {
                  setIsCreating(true);
                  field.onChange(null);
                } else {
                  setIsCreating(false);
                  field.onChange(v);
                }
              }}
            />

            {isCreating && (
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-full">
                  <Input
                    placeholder="Название новой категории"
                    value={newCategory}
                    inputSize={"size_56"}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreate();
                      }
                    }}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-2.5">
                  <Button
                    type={"button"}
                    size={"size_56"}
                    className={"w-14 px-0"}
                    onClick={() => handleCreate()}
                    isLoading={isLoading}
                    disabled={!newCategory.trim() || isLoading}
                  >
                    <PlusIcon width={20} height={20} />
                  </Button>
                  <Button
                    type={"button"}
                    variant={"gray"}
                    size={"size_56"}
                    className={"w-14"}
                    onClick={() => {
                      setIsCreating(false);
                      setNewCategory("");
                      field.onChange(null);
                    }}
                  >
                    <CloseIcon width={20} height={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      }
    />
  );
}
