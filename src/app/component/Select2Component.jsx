"use client";

import { useEffect } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
export default function Select2Component({ id, options, select2Options = {}, showSearch = false, onChange, type, setSort, setCountry, setDepartmentid, setValidation, setMessage, validation, message,setData,data }) {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const $select = $(`#${id}`).select2({
        allowClear: select2Options.allowClear ?? false,
        placeholder: select2Options.placeholder ?? "Select an option",
        dropdownAutoWidth: true,
        width: "100%",
        minimumResultsForSearch: showSearch ? 0 : Infinity, // ✅ Dynamically enable/disable search box
        ...select2Options,
      });

      // ✅ When dropdown opens, ensure search box is visible
      $select.on("select2:open", () => {
        if (showSearch) {
          setTimeout(() => {
            const dropdown = $(".select2-container--open .select2-search--hide");
            dropdown.removeClass("select2-search--hide"); // ✅ Remove class initially
          }, 50);
        }
      });

      // ✅ Keep monitoring the search box while typing
      $(document).on("keyup", ".select2-search__field", function () {
        if (showSearch) {
          setTimeout(() => {
            $(".select2-container--open .select2-search--hide").removeClass("select2-search--hide");
          }, 10);
        }
      });

      $select.on("change", async function (e) {
        const selectedValue = $(this).val();

        onChange?.(selectedValue); // ✅ optional call

        if (validation) {
          const updateValidation = { ...validation };
          const updateMessage = { ...message };
          const updateData = { ...data};
          updateData['country']=selectedValue;
          if (selectedValue === "") {

            updateValidation['country'] = false
            updateMessage['country'] = 'The country name field is required.'

          }
          else {
            updateValidation['country'] = true
            updateMessage['country'] = "";
          }
          setValidation(updateValidation)
          setMessage(updateMessage)
          setData(updateData)
        }

        if (type === 'category') {
          if (path === '/') {
            router.push(`/doctors?category=${selectedValue}`)
          } else {
            router.push(`${path}?category=${selectedValue}`)
          }
        }
        else if (type === 'sort') {

          setSort(selectedValue);

        }
        else if (type === 'country') {

          setCountry(selectedValue);
        }
        else if (type === 'department') {

          setDepartmentid(selectedValue);
          
          
        }
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        $(`#${id}`).select2("destroy");
        $(document).off("keyup", ".select2-search__field"); // ✅ Remove event listener on unmount
      }
    };
  }, [id, select2Options, showSearch]);

  return (
    <select id={id}  className={`form-control select2-no-search w-70 ${message?.country ? "countryError" : ""}`}>
      {/* ✅ Placeholder option */}
      {select2Options.placeholder && <option value="">{select2Options.placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
