import { DropdownMenu, SingleSelect } from "components/selects";
import type { Option } from "components/selects/types";
import Text from "components/text";
import { useUserSettings } from "context/event-store-context";
import { translationFunction } from "context/language-context";

import { Switch } from "@/components/ui/Switch";
import { FlexGap } from "@/containers";
import { SortMarketsBy } from "@/sdk/indexer-v2/types/common";

import { StyledTHFilters } from "../styled";

const titleFromValue: Record<SortMarketsBy, string> = {
  [SortMarketsBy.MarketCap]: "Market Cap",
  [SortMarketsBy.BumpOrder]: "Bump Order",
  [SortMarketsBy.DailyVolume]: "24h Volume",
  [SortMarketsBy.AllTimeVolume]: "Alltime Vol",
  [SortMarketsBy.Price]: "Price",
  [SortMarketsBy.Apr]: "APR",
  [SortMarketsBy.Tvl]: "TVL",
};

const options: Array<Option> = [
  { title: titleFromValue[SortMarketsBy.MarketCap], value: SortMarketsBy.MarketCap },
  { title: titleFromValue[SortMarketsBy.BumpOrder], value: SortMarketsBy.BumpOrder },
  { title: titleFromValue[SortMarketsBy.DailyVolume], value: SortMarketsBy.DailyVolume },
  { title: titleFromValue[SortMarketsBy.AllTimeVolume], value: SortMarketsBy.AllTimeVolume },
  // TODO: Add price..?
];

type FilterOptionsComponentProps = {
  filter: SortMarketsBy;
  onChange: (value: SortMarketsBy) => void;
};

const FilterOptionsComponent = ({ filter, onChange }: FilterOptionsComponentProps) => {
  const selectedOption = options.find((x) => x.value === filter)!;
  const { t } = translationFunction();
  const animate = useUserSettings((s) => s.animate);
  const toggleAnimate = useUserSettings((s) => s.toggleAnimate);

  return (
    <StyledTHFilters>
      <SingleSelect
        wrapperProps={{
          className: "med-pixel-text xl:w-[300px] xs:w-unset xl:mr-inherit xs:mr-[20px]",
        }}
        title={selectedOption?.title}
        value={selectedOption}
        setValue={(option) => {
          onChange(option.value as SortMarketsBy);
        }}
        dropdownComponent={DropdownMenu}
        onHover={(_) => {}}
        options={options}
        dropdownWrapperProps={{ width: "250px" }}
        titleProps={{ color: "darkGray", textTransform: "uppercase" }}
        placeholderProps={{
          textTransform: "uppercase",
          color: "lightGray",
          className: "med-pixel-text",
        }}
        placeholder="Sort:"
      />

      <FlexGap gap="12px" className={"items-center med-pixel-text"}>
        <Text className={"med-pixel-text"} color="lightGray" textTransform="uppercase">
          {t("Animate:")}
        </Text>

        <Switch checked={animate} onCheckedChange={toggleAnimate} />
      </FlexGap>
    </StyledTHFilters>
  );
};

export default FilterOptionsComponent;
