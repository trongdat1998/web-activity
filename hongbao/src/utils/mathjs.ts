import { create, all } from "mathjs";

const config = {};
const math: any = create(all, config);

math.config({ number: "BigNumber" });

export default math;
