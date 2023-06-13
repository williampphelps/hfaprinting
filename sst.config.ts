import type { SSTConfig } from "sst";
import { SvelteKitSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "hfaprinting",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new SvelteKitSite(stack, "Site", {
        customDomain: {
          domainName: app.stage == "prod" ? "printing.higherfinearts.com" : app.stage + ".higherfinearts.com",
          hostedZone: "higherfinearts.com"
        }
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
