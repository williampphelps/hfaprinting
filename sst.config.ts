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
      let domainConfig = {
        domainName: app.stage == "prod" ? "higherfinearts.com" : app.stage + ".higherfinearts.com",
        hostedZone: "higherfinearts.com"
      }

      if (app.stage == "prod") {
        domainConfig.domainAlias = 'www.higherfinearts.com'
      }
      const site = new SvelteKitSite(stack, "Site", {
        customDomain: domainConfig
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
