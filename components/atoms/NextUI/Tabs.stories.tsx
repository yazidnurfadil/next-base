import React, { useState } from "react";
import { Key } from "@react-types/shared";
import { Meta } from "@storybook/react";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import {
  AlignBottomBoldIcon,
  AlignHorizontallyBoldIcon,
  AlignLeftBoldIcon,
  AlignRightBoldIcon,
  AlignTopBoldIcon,
  AlignVerticallyBoldIcon,
} from "@nextui-org/shared-icons";
import { Tab, Tabs, TabsProps } from "@nextui-org/tabs";
import { button, link, tabs } from "@nextui-org/theme";

export default {
  title: "Atoms/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "underlined", "bordered", "light"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Tabs>;

const defaultProps = {
  ...tabs.defaultVariants,
};

const StaticTemplate = (args: TabsProps) => (
  <Tabs aria-label="Tabs example" {...args}>
    <Tab key="world" title="World">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        corrupti quia et quis maxime corporis aut veritatis molestias, saepe
        doloribus!
      </p>
    </Tab>
    <Tab key="ny" title="N.Y">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero odio at
        nihil molestiae fugit dolores unde deserunt delectus. Odio voluptate
        temporibus non maiores cum accusamus commodi tenetur, perspiciatis eaque
        iste.
      </p>
    </Tab>
    <Tab key="business" title="Business">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, pariatur.
      </p>
    </Tab>
    <Tab key="arts" title="Arts">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae
        incidunt, voluptatibus dolores odio impedit sequi ex, rerum, nam quod
        tempora non cupiditate? Ratione ipsum sit in eaque inventore consectetur
        non provident dolorem! Aliquid accusantium delectus ipsum impedit, animi
        fugiat labore eligendi, esse, architecto itaque consequatur quod. Rem
        provident ea repudiandae?
      </p>
    </Tab>
    <Tab key="science" title="Science">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error nostrum
      reiciendis sunt eius, repudiandae nisi, ratione blanditiis reprehenderit
      sint possimus eligendi recusandae, illum quas.
    </Tab>
  </Tabs>
);

const WithIconsTemplate = (args: TabsProps) => (
  <Tabs
    aria-label="Tabs example"
    {...args}
    classNames={{
      tab: "text-lg",
    }}
  >
    <Tab
      key="align-left"
      title={<AlignLeftBoldIcon />}
      titleValue="Align left"
    />
    <Tab
      key="align-vertically"
      title={<AlignVerticallyBoldIcon />}
      titleValue="Align vertically"
    />
    <Tab
      key="align-right"
      title={<AlignRightBoldIcon />}
      titleValue="Align right"
    />
    <Tab key="align-top" title={<AlignTopBoldIcon />} titleValue="Align top" />
    <Tab
      key="align-horizontally"
      title={<AlignHorizontallyBoldIcon />}
      titleValue="Align horizontally"
    />
    <Tab
      key="align-bottom"
      title={<AlignBottomBoldIcon />}
      titleValue="Align bottom"
    />
  </Tabs>
);

const ControlledTemplate = (args: TabsProps) => {
  const [selected, setSelected] = useState<Key>("world");

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        aria-label="Tabs example"
        {...args}
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="world" title="World">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            corrupti quia et quis maxime corporis aut veritatis molestias, saepe
            doloribus!
          </p>
        </Tab>
        <Tab key="ny" title="N.Y">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero odio
            at nihil molestiae fugit dolores unde deserunt delectus. Odio
            voluptate temporibus non maiores cum accusamus commodi tenetur,
            perspiciatis eaque iste.
          </p>
        </Tab>
        <Tab key="business" title="Business">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
            pariatur.
          </p>
        </Tab>
        <Tab key="arts" title="Arts">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Repudiandae incidunt, voluptatibus dolores odio impedit sequi ex,
            rerum, nam quod tempora non cupiditate? Ratione ipsum sit in eaque
            inventore consectetur non provident dolorem! Aliquid accusantium
            delectus ipsum impedit, animi fugiat labore eligendi, esse,
            architecto itaque consequatur quod. Rem provident ea repudiandae?
          </p>
        </Tab>
        <Tab key="science" title="Science">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
          nostrum reiciendis sunt eius, repudiandae nisi, ratione blanditiis
          reprehenderit sint possimus eligendi recusandae, illum quas.
        </Tab>
      </Tabs>

      <p className="text-default-500">Selected: {selected}</p>

      <div className="flex justify-start gap-2">
        <button
          className={button({ color: "secondary", variant: "flat" })}
          onClick={() => setSelected("arts")}
        >
          Select &quot;Arts&quot;
        </button>
        <button
          className={button({ color: "secondary", variant: "flat" })}
          onClick={() => setSelected("science")}
        >
          Select &quot;Science&quot;
        </button>
      </div>
    </div>
  );
};

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

const DynamicTemplate = (args: TabsProps<Item>) => {
  const tabs: Item[] = [
    {
      id: "world",
      label: "World",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "ny",
      label: "N.Y.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
    {
      id: "business",
      label: "Business",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet.",
    },
    {
      id: "arts",
      label: "Arts",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
    {
      id: "science",
      label: "Science",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non diam id libero rutrum aliquam. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. Sed vitae nisl eget nunc aliquam aliquet. Sed eget nunc vitae nisl aliquam aliquet. ",
    },
  ];

  return (
    <Tabs aria-label="Dynamic tabs" {...args} items={tabs}>
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  );
};

const WithFormTemplate = (args: TabsProps) => {
  const [selected, setSelected] = useState<Key>("login");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="h-[400px] w-[340px]">
        <CardBody>
          <Tabs
            aria-label="Tabs form"
            {...args}
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Need to create an account?&nbsp;
                  <button
                    className={link({ size: "sm" })}
                    onClick={() => setSelected("sign-up")}
                  >
                    Sign up
                  </button>
                </p>
                <div className="flex justify-end gap-2">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex h-[300px] flex-col gap-4">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="password"
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-sm">
                  Already have an account?&nbsp;
                  <button
                    className={link({ size: "sm" })}
                    onClick={() => setSelected("login")}
                  >
                    Login
                  </button>
                </p>
                <div className="flex justify-end gap-2">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export const Default = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
  },
};

export const Dynamic = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithIcons = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithForm = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
    fullWidth: true,
    variant: "underlined",
  },
};

export const ManualKeyboardActivation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    keyboardActivation: "manual",
  },
};

export const Placement = {
  render: StaticTemplate,

  args: {
    placement: "top",
  },
  argTypes: {
    placement: {
      options: ["top", "bottom", "start", "end"],
      control: {
        type: "inline-radio",
      },
    },
    isVertical: {
      type: "boolean",
    },
  },
};

export const Vertical = {
  render: StaticTemplate,

  args: {
    isVertical: true,
  },
  argTypes: {
    isVertical: {
      type: "boolean",
    },
  },
};

export const DisabledItems = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disabledKeys: ["ny", "arts"],
  },
};

export const Disabled = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableAnimation = {
  render: StaticTemplate,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};