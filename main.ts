import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AzurermProvider, PublicIp } from "@cdktf/provider-azurerm";

export class MyConstruct extends Construct {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new PublicIp(this, "publicIp", {
      resourceGroupName: "my-resource-group",
      allocationMethod: "Dynamic",
      location: "westus",
      name: "my-public-ip",
    });
  }
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new AzurermProvider(this, "azurerm", {
      features: {},
    });

    new MyConstruct(this, "myConstruct");
  }
}

const app = new App();
new MyStack(app, "cdktf-issue-1506");
app.synth();
