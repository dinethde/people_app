import { Button } from "@root/components/ui/button";
import {
  EmployeeInfo,
  UpdateEmployeeInfoPayload,
  updateEmployeeInfo,
} from "@root/src/slices/employeeSlice/employee";
import { RootState, useAppDispatch, useAppSelector } from "@root/src/slices/store";
import { EmployeeInfoSchema } from "@root/src/utils/EmployeeInfoSchema";
import { useForm } from "@tanstack/react-form";
import { LucideIcon } from "lucide-react";

import { useState } from "react";

import { hexToRgba } from "@utils/utils";

import { FormRow } from "../layout/FormRow";
import { DateField } from "./DateField";
import { DigitsField } from "./DigitsField";
import { EmailField } from "./EmailField";
import { PhoneField } from "./PhoneField";
import { TextField } from "./TextField";

interface ProfileCardProps {
  Icon: LucideIcon;
  IconColor: string;
  heading: string;
  ActionIcon: LucideIcon;
}

function ProfileCard(props: ProfileCardProps) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const employee = useAppSelector((State: RootState) => State.employee.employee);

  const getChangedFields = (
    prev: EmployeeInfo,
    cur: UpdateEmployeeInfoPayload,
  ): Partial<UpdateEmployeeInfoPayload> => {
    const changes: Partial<UpdateEmployeeInfoPayload> = {};

    changes.id = prev.id;
    changes.wso2Email = prev.wso2Email;

    for (const [key, prevVal] of Object.entries(prev)) {
      const curVal = (cur as any)[key];

      // Skip undefined in current (means "not touched")
      if (curVal === undefined) continue;

      // Only include if value is different
      if (curVal !== prevVal) {
        (changes as any)[key] = curVal;
      }
    }

    return changes;
  };

  const defaultValues = employee ?? ({} as EmployeeInfo);

  const form = useForm({
    defaultValues,
    validators: {
      onChange: EmployeeInfoSchema,
    },
    onSubmit: async ({ value }) => {
      if (!employee) return;
      console.log("Form submitting : ", value);

      const changes = getChangedFields(employee, value);
      console.log("Changes : ", changes);

      dispatch(updateEmployeeInfo(changes));
    },
  });

  // Now it's safe to conditionally render UI (not hooks)
  if (!employee) {
    return (
      <div className="w-full rounded-2xl border p-4">
        {/* show skeleton/placeholder here */}
        Loading…
      </div>
    );
  }

  const { Icon, heading, ActionIcon, IconColor } = props;

  const color = IconColor.startsWith("#") ? IconColor : `#${IconColor}`;

  const handleActionIconClicked = () => {
    setEditing((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-[#F5F8FA] border-1 border-st-card-border p-1 pt-4 rounded-2xl">
      <div className="flex flex-row gap-2 px-3 justify-center items-center">
        <div
          style={{ backgroundColor: hexToRgba(color, 0.2) }}
          className={`rounded-[4px] p-1 bg-[${hexToRgba(IconColor, 20)}]`}
        >
          <Icon style={{ color }} className="w-5 h-5" />
        </div>
        <p className="w-full h6 text-st-200 ">{heading}</p>
        {editing ? (
          <div className="flex flex-row gap-4">
            <Button
              variant={"secondary"}
              onClick={handleActionIconClicked}
              className="border border-st-border-light"
            >
              Cancel
            </Button>
            <Button> Save</Button>
          </div>
        ) : (
          <div onClick={handleActionIconClicked}>
            <ActionIcon className="text-[#1476B8]" />
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-4 w-full bg-white/70 border-1 border-st-card-inner-border rounded-lg p-4 ">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-5"
          >
            {/* Row 1 */}
            <FormRow cols={3}>
              <form.Field name="id">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Employee ID"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="jobRole">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Job Role"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="jobBand">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Job Band"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 2 */}
            <FormRow cols={3}>
              <form.Field name="firstName">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="First Name"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="lastName">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Last Name"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="wso2Email">
                {(field) => (
                  <EmailField
                    name={field.name}
                    label="WSO2 Email"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 3 */}
            <FormRow cols={3}>
              <form.Field name="workPhoneNumber">
                {(field) => (
                  <PhoneField
                    name={field.name}
                    label="Phone number"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="epf">
                {(field) => (
                  <DigitsField
                    name={field.name}
                    label="EPF"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="employmentType">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Employment Type"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 4 */}
            <FormRow cols={3}>
              <form.Field name="company">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Company"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="office">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Office"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="workLocation">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Work Location"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 5 */}
            <FormRow cols={3}>
              <form.Field name="employeeLocation">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Employee Location"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="employeeStatus">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Employee Status"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="relocationStatus">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Relocation Status"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 6 */}
            <FormRow cols={3}>
              <form.Field name="businessUnit">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Business Unit"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="team">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Team"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="subTeam">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Sub-Team"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 7 */}
            <FormRow cols={3}>
              <form.Field name="unit">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Unit"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="lengthOfService">
                {(field) => (
                  <DigitsField
                    name={field.name}
                    label="Length of Service (years)"
                    value={field.state.value ?? 0}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                    type="number"
                  />
                )}
              </form.Field>

              <form.Field name="subordinateCount">
                {(field) => (
                  <DigitsField
                    name={field.name}
                    label="Subordinate Count"
                    value={field.state.value ?? 0}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 8 */}
            <FormRow cols={3}>
              <form.Field name="managerEmail">
                {(field) => (
                  <EmailField
                    name={field.name}
                    label="Manager Email"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>

              <form.Field name="reportToEmail">
                {(field) => (
                  <EmailField
                    name={field.name}
                    label="Report-To Email"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>

              <form.Field name="additionalManagerEmail">
                {(field) => (
                  <EmailField
                    name={field.name}
                    label="Additional Manager Email"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 9 */}
            <FormRow cols={3}>
              <form.Field name="additionalReportToEmail">
                {(field) => (
                  <EmailField
                    name={field.name}
                    label="Additional Report-To Email"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>

              <form.Field name="employeeThumbnail">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Employee Thumbnail"
                    value={field.state.value ?? ""}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={!editing}
                  />
                )}
              </form.Field>

              <form.Field name="agreementEndDate">
                {(field) => (
                  <DateField
                    name={field.name}
                    label="Agreement End Date"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                  />
                )}
              </form.Field>
            </FormRow>

            {/* Row 10 */}
            <FormRow cols={3}>
              <form.Field name="startDate">
                {(field) => (
                  <DateField
                    name={field.name}
                    label="Start Date"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                  />
                )}
              </form.Field>

              <form.Field name="probationEndDate">
                {(field) => (
                  <DateField
                    name={field.name}
                    label="Probation End Year"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                  />
                )}
              </form.Field>

              <form.Field name="timestamp">
                {(field) => (
                  <TextField
                    name={field.name}
                    label="Timestamp"
                    value={
                      Array.isArray(field.state.value)
                        ? `${field.state.value[0] ?? ""}, ${field.state.value[1] ?? ""}`
                        : ""
                    }
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    disabled={true}
                  />
                )}
              </form.Field>
            </FormRow>

            <form.Subscribe
              selector={(s) => ({
                canSubmit: s.canSubmit,
                errors: s.errorMap,
                touched: s.isTouched,
              })}
            >
              {(state) => (
                <pre className="text-xs bg-stone-50 p-2 rounded">
                  {JSON.stringify(state, null, 2)}
                </pre>
              )}
            </form.Subscribe>

            {editing && (
              <form.Subscribe
                selector={(state) => (
                  console.log("State : ", state.canSubmit, state.isSubmitting),
                  [state.canSubmit, state.isSubmitting]
                )}
                children={([canSubmit, isSubmitting]) => (
                  console.log("Children state  : ", canSubmit, isSubmitting),
                  (
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? "..." : "Submit"}
                    </Button>
                  )
                )}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
