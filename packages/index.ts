import AreaSelector from "./areaSelector.vue";
import type {
  AreaDataDto,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
  Resolve,
} from "./types";
const install = function (app: any) {
  app.component("AreaSelector", AreaSelector);
};
export {
  AreaSelector,
  AreaSelectorResultDto,
  AreaDataDto,
  AreaSelectorPropsDto,
  Resolve,
};
export default { install };
