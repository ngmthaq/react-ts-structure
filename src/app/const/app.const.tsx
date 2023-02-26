import { LayersOutlined, TableRowsRounded } from "@mui/icons-material";
import { AppConst } from "spec/app.const";

const APP_CONST: AppConst = {
  header: {
    height: 52,
  },
  footer: {
    height: 52,
  },
  nav: {
    height: 52,
  },
  notification: {
    timeout: 6000,
  },
  viewModes: {
    swipe: {
      id: 0,
      alt: "Swipe mode",
      Icon: LayersOutlined,
    },
    scroll: {
      id: 1,
      alt: "Scroll mode",
      Icon: TableRowsRounded,
    },
  },
};

export default APP_CONST;
