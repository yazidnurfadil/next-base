/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";

import { clsx } from "@heroui/shared-utils";
import { radio, button } from "@heroui/theme";
import {
  Radio,
  useRadio,
  RadioGroup,
  RadioProps,
  RadioGroupProps,
  useRadioGroupContext,
} from "@heroui/radio";

import { Meta } from "@storybook/react";

import type { ValidationResult } from "@react-types/shared";

import { VisuallyHidden } from "@react-aria/visually-hidden";

export default {
  title: "Atoms/Radio",
  component: RadioGroup,
  onChange: { action: "changed" },
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    validationBehavior: {
      options: ["aria", "native"],
      control: {
        type: "select",
      },
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
  },
} as Meta<typeof RadioGroup>;

const defaultProps = {
  ...radio.defaultVariants,
  label: "Options",
};

const Template = (args: RadioGroupProps) => {
  const radioProps = args.description
    ? {
        a: {
          description: "Description for Option A",
        },
        b: {
          description: "Description for Option B",
        },
        c: {
          description: "Description for Option C",
        },
        d: {
          description: "Description for Option D",
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D
      </Radio>
    </>
  );

  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        alert(
          `Submitted value: ${(e.target as HTMLFormElement)["sample"].value}`
        );
        e.preventDefault();
      }}
    >
      <RadioGroup {...args} name="sample">
        {items}
      </RadioGroup>
      <button type="submit" className={button({ color: "primary" })}>
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

const InvalidTemplate = (args: RadioGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState<boolean>(true);

  const radioProps = args.description
    ? {
        a: {
          description: "Description for Option A",
        },
        b: {
          description: "Description for Option B",
        },
        c: {
          description: "Description for Option C",
        },
        d: {
          description: "Description for Option D",
        },
      }
    : {
        a: {},
        b: {},
        c: {},
        d: {},
      };

  const items = (
    <>
      <Radio value="A" {...radioProps.a}>
        Option A (Invalid)
      </Radio>
      <Radio value="B" {...radioProps.b}>
        Option B (Valid)
      </Radio>
      <Radio value="C" {...radioProps.c}>
        Option C (Valid)
      </Radio>
      <Radio value="D" {...radioProps.d}>
        Option D (Invalid)
      </Radio>
    </>
  );

  const validOptions = ["C", "B"];

  return args.isRequired ? (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Submitted!");
      }}
    >
      <RadioGroup
        {...args}
        isInvalid={isInvalid}
        onValueChange={(value) => setIsInvalid(!validOptions.includes(value))}
      >
        {items}
      </RadioGroup>
      <button type="submit" className={button({ color: "primary" })}>
        Submit
      </button>
    </form>
  ) : (
    <RadioGroup {...args}>{items}</RadioGroup>
  );
};

const ControlledTemplate = (args: RadioGroupProps) => {
  const [selectedItem, setSelectedItem] = React.useState<string>("london");

  React.useEffect(() => {
    console.log("isSelected:", selectedItem);
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        label="Select city"
        value={selectedItem}
        onValueChange={setSelectedItem}
        {...args}
      >
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
      <p className="text-default-500">Selected: {selectedItem}</p>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultChecked = {
  render: Template,

  args: {
    ...defaultProps,
    defaultValue: "C",
  },
};

export const IsRequired = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please select an option",
  },
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    description: "Please select an option",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    isRequired: true,
    errorMessage: "The selected option is invalid",
  },
};

export const WithErrorMessageFunction = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.valueMissing) {
        return "Please select an option";
      }
    },
  },
};

export const WithValidation = {
  render: Template,

  args: {
    ...defaultProps,
    isRequired: true,
    description: "Please select an option",
    validate: (value: string) => {
      if (value === "A") {
        return "Option A is not allowed";
      }
    },
  },
};

export const Row = {
  render: Template,

  args: {
    ...defaultProps,
    orientation: "horizontal",
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  const { groupState } = useRadioGroupContext();

  const isSelected = groupState.selectedValue === otherProps.value;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: clsx(
          "inline-flex max-w-[300px] cursor-pointer flex-row-reverse items-center justify-between gap-4 rounded-lg border-2 border-transparent bg-content1 p-4 hover:bg-content2",
          {
            "border-primary": isSelected,
          }
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomWithClassNames = () => {
  return (
    <RadioGroup label="Plans">
      <CustomRadio value="free" description="Up to 20 items">
        Free
      </CustomRadio>
      <CustomRadio value="pro" description="Unlimited items. $10 per month.">
        Pro
      </CustomRadio>
      <CustomRadio
        value="enterprise"
        description="24/7 support. Contact us for pricing."
      >
        Enterprise
      </CustomRadio>
    </RadioGroup>
  );
};

const RadioCard = (props: RadioProps) => {
  const {
    children,
    Component,
    isSelected,
    description,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getWrapperProps,
    getControlProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={clsx(
        "group inline-flex max-w-[300px] cursor-pointer flex-row-reverse items-center justify-between gap-4 rounded-lg border-2 border-default p-4 hover:bg-content2",
        {
          "border-primary": isSelected,
        }
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className={clsx("text-sm text-foreground opacity-70")}>
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

export const CustomWithHooks = () => {
  return (
    <RadioGroup label="Plans">
      <RadioCard value="free" description="Up to 20 items">
        Free
      </RadioCard>
      <RadioCard value="pro" description="Unlimited items. $10 per month.">
        Pro
      </RadioCard>
      <RadioCard
        value="enterprise"
        description="24/7 support. Contact us for pricing."
      >
        Enterprise
      </RadioCard>
    </RadioGroup>
  );
};
