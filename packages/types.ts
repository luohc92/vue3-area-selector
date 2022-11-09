export interface AreaDataDto {
  code: string;
  name: string;
  children?: AreaDataDto[];
  [key: string]: any;
}
export interface AreaSelectorResultDto {
  code: string;
  province: string;
  city?: string;
  district?: string;
  town?: string;
}
export interface DomPropsDto {
  left: number;
  top: number;
  height: number;
  width: number;
  right: number;
  bottom: number;
}
export type Resolve = (towns?: AreaDataDto[]) => void;
export interface AreaSelectorPropsDto {
  level?: number;
  showAllLevels?: boolean;
  popperClass?: string;
  areaData?: AreaDataDto[];
  disabled?: string[];
  townLazy?: boolean;
  lazyLoad?: (node: AreaDataDto, resolve: Resolve) => void;
}
