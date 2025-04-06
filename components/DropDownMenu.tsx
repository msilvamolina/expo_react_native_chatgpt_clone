import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

export type Props = {
  items: {
    key: string;
    title: string;
    icon: string;
  }[];
  onSelect: (key: string) => void;
};

const DrowDownMenu = ({ items, onSelect }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items.map((item) => {
          return (
            <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
              <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon ios={{ name: item.icon, pointSize: 18 }} />
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DrowDownMenu;
