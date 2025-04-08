import React from 'react';
import { View, Text } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';
import Colors from '~/constants/Colors';
export type HeaderDropDownProps = {
  title: string;
  selected?: string;
  onSelect?: (key: string) => void;
  items: { key: string; title: string; icon: string }[];
};
const HeaderDropDown = ({ title, selected, items, onSelect }: HeaderDropDownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>{title}</Text>
          {selected && (
            <Text
              style={{ marginLeft: 10, color: Colors.greyLight, fontSize: 16, fontWeight: '500' }}>
              {selected && <Text>{selected} &gt;</Text>}
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map((item) => (
          <DropdownMenu.Item key={item.key} onSelect={() => onSelect!(item.key)}>
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: item.icon as any, // required
                pointSize: 18,
                weight: 'semibold',
                scale: 'medium',
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default HeaderDropDown;
