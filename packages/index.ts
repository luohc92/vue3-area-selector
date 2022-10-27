import AreaSelect from "./areaSelect.vue";
import type {
  AreaDataDto,
  AreaSelectPropsDto,
  AreaSelectResultDto,
} from "./types";
const install = function (app: any) {
  app.component("AreaSelect", AreaSelect);
};
export { AreaSelect };
export { AreaSelectResultDto, AreaDataDto, AreaSelectPropsDto };
export default { install };
