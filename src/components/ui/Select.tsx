import React, { useEffect, useState } from "react";
import ReactSelect, {
    components,
    OptionsOrGroups,
    GroupBase,
    GetOptionLabel,
    InputActionMeta,
    ActionMeta,
    DropdownIndicatorProps,
} from "react-select";
import { XCircle, Info, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select(props: {
    menuIsOpen?: boolean;
    disabled?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    isMulti?: boolean;
    isLoading?: boolean;
    options?: OptionsOrGroups<any, GroupBase<any>>;
    getOptionLabel?: GetOptionLabel<any>;
    isClearable?: boolean;
    onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
    placeholder?: any;
    value: any;
    onValueChange?: (newValue: any, actionMeta: ActionMeta<any>) => void;
    children?: React.ReactNode;
    disableMessage?: boolean;
    invalid?: string | boolean;
    invalidKey?: React.Key | null;
    warnMessage?: string;
    menuPlacement?: "auto" | "bottom" | "top";
    icon?: React.ReactNode;
}) {
    const icon = props.icon;

    const ClearIndicator = (props: any) => {
        const {
            innerProps: { ref, ...restInnerProps },
        } = props;
        return (
            <div {...restInnerProps} className="pr-2 cursor-pointer hover:opacity-80 transition-opacity">
                <XCircle className="w-4 h-4 text-red-400 hover:text-red-500" />
            </div>
        );
    };

    const DropdownIndicator = (props: DropdownIndicatorProps) => {
        return (
            <components.DropdownIndicator {...props}>
                {icon ? icon : <ChevronDown className="w-5 h-5 text-textSecondary" />}
            </components.DropdownIndicator>
        );
    };

    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    return (
        <div className="w-full bg-surface border border-border rounded-xl px-2 py-2 text-white focus:outline-none focus:border-primary transition-colors text-base">
            <ReactSelect
                menuPosition="fixed"
                menuPlacement={props.menuPlacement || "auto"}
                defaultValue={props.value}
                components={{ ClearIndicator, DropdownIndicator }}
                menuIsOpen={props.menuIsOpen}
                isDisabled={props.disabled}
                onBlur={props.onBlur}
                isMulti={props.isMulti}
                isLoading={props.isLoading}
                options={props.options}
                getOptionLabel={props.getOptionLabel}
                isClearable={props.isClearable}
                onInputChange={props.onInputChange}
                placeholder={props.placeholder}
                closeMenuOnSelect={!props.isMulti}
                value={props.value}
                loadingMessage={() => "Sedang mencari data..."}
                noOptionsMessage={() => (
                    <span className="flex items-center justify-center text-red-400 text-sm py-2">
                        <Info className="w-4 h-4 mr-2" /> Pilihan tidak ditemukan
                    </span>
                )}
                menuPortalTarget={portalTarget}

                classNames={{
                    control: ({ isFocused }) =>
                        cn(
                            "bg-surface rounded-xl px-2 min-h-[52px] transition-colors cursor-pointer border",
                            isFocused ? "border-primary outline-none" : "border-border hover:border-primary/50",
                            props.invalid ? "border-red-500" : ""
                        ),
                    // Tambahkan ! pada bg-surface agar tidak tertimpa default react-select
                    menu: () => "!bg-surface border border-border rounded-xl shadow-2xl mt-2 overflow-hidden z-50",
                    menuList: () => "p-1",
                    option: ({ isFocused, isSelected }) =>
                        cn(
                            "px-4 py-3 text-base cursor-pointer rounded-lg transition-colors my-0.5",
                            isSelected
                                ? "!bg-primary/10 text-primary font-medium" // Tambahkan ! di sini
                                : isFocused
                                    ? "!bg-surfaceHover text-white" // Tambahkan ! di sini
                                    : "text-white hover:!bg-surfaceHover" // Tambahkan ! di sini
                        ),
                    singleValue: () => "text-white",
                    placeholder: () => "text-textSecondary",
                    input: () => "text-white",
                    indicatorSeparator: () => "hidden",
                }}

                // --- RESET INLINE STYLES ---
                styles={{
                    control: (base) => ({ ...base, backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: 'none', '&:hover': { borderColor: 'transparent' } }),
                    // Hapus backgroundColor: 'transparent' di sini
                    menu: (base) => ({ ...base, boxShadow: 'none', backgroundColor: undefined }),
                    menuPortal: (base) => ({ ...base, zIndex: 999999 }),
                    // Hapus backgroundColor: 'transparent' di sini juga
                    option: (base) => ({ ...base, backgroundColor: undefined }),
                    singleValue: (base) => ({ ...base, color: 'inherit' }),
                    input: (base) => ({ ...base, color: 'inherit' }),
                }}
                onChange={props.onValueChange}
            />

            {props.children}
            {!props.disableMessage && props.invalid && (
                <div className="mt-1 h-5">
                    <span key={props.invalidKey} className="block text-xs text-red-500 font-medium">
                        {props.invalid}
                    </span>
                </div>
            )}
            {props.warnMessage && <span className="block text-xs text-yellow-500 mt-1">{props.warnMessage}</span>}
        </div>
    );
}