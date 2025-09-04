// Copyright (c) 2025 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { Video as VideoCallIcon } from "lucide-react";
import { History as HistoryIcon } from "lucide-react";
import DemoTabOne from "@root/src/view/demoTabs/panel/demoTabOne";
import DemoTabTwo from "@root/src/view/demoTabs/panel/demoTabTwo";
import TabsPage from "@root/src/layout/pages/TabsPage";

export default function DemoTabs() {
  return (
    <TabsPage
      title="Demo Tabs"
      tabsPage={[
        {
          tabTitle: "Demo Tab One",
          tabPath: "demo-tab-one",
          icon: <VideoCallIcon />,
          page: <DemoTabOne />,
        },
        {
          tabTitle: "Demo Tab Two",
          tabPath: "demo-tab-two",
          icon: <HistoryIcon />,
          page: <DemoTabTwo />,
        },
      ]}
    />
  );
}
