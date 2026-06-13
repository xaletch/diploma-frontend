import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ISpecialization } from "../type/specialization.type";

interface Company {
  name: string;
  currency: CurrencyType;
  country: string;
  region?: string;
  city?: string;
  post_code?: string;
  street?: string;
  house?: string;
  timezone: string;
  timezone_offset: string;
  lat: string;
  lng: string;
  specialization?: number;
  industry?: number;
  logo?: File | null;
  address?: string;
}

type CompanyState = {
  company: Company | undefined;
  specialization: ISpecialization | undefined;
  industry: number;
  step: number;
}

const initialState: CompanyState = {
  company: undefined,
  specialization: undefined,
  industry: 0,
  step: 1,
}

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.company = action.payload;
    },
    addCompanySpecialization(state, action: PayloadAction<ISpecialization>) {
      const company = state.company;
      const specialization = action.payload;
      if (company) {
        company.specialization = specialization.id;
        state.specialization = specialization;
      }
    },
    addCompanyIndustry(state, action: PayloadAction<number>) {
      const company = state.company;
      const industryId = action.payload;
      if (company) {
        company.industry = industryId;
        state.industry = industryId;
      }
    },
    CompanyNextStep(state) {
      if (state.step < 3) {
        state.step += 1;
      }
    },
    CompanyPrevStep(state) {
      if (state.step > 1) {
        state.step -= 1;
        if (state.step === 2) {
          state.industry = 0;
          state.specialization = undefined;
        }
      }
    },
    clearCompany(state) {
      state.company = undefined;
    },
  },
});

export const { 
  addCompany, 
  addCompanySpecialization, 
  addCompanyIndustry, 
  CompanyNextStep,
  CompanyPrevStep,
  clearCompany,
} = companySlice.actions;
export default companySlice.reducer;