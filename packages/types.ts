export interface AreaDataDto {
  code: string;
  name: string;
  children?: AreaDataDto[];
}
export interface AreaSelectResultDto {
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
type Resolve = (dataList?: AreaDataDto[]) => void;
export interface AreaSelectPropsDto {
  level: number;
  showAllLevels: boolean;
  popperClass: string;
  areaData: AreaDataDto[];
  disabled?: string[];
  townLazy?: boolean;
  lazyLoad?: (node: AreaDataDto, resolve: Resolve) => void;
}
