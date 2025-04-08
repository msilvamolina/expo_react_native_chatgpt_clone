import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
const APIKeys = {
  apple: process.env.EXPO_PUBLIC_RC_APPLE_KEY as string,
  google: process.env.EXPO_PUBLIC_RC_GOOGLE_KEY as string,
};

interface RevenueCatProps {
  purchasePackage: (pack: PurchasesPackage) => Promise<void>;
  restorePermissions: () => Promise<CustomerInfo>;
  user: UserState;
  packages: PurchasesPackage[];
}

export interface UserState {
  dalle: boolean;
}

const RevenueCatContext = createContext<Partial<RevenueCatProps>>({});

export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};

export const RevenueCatProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserState>({
    dalle: false,
  });
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'ios') {
        Purchases.configure({
          apiKey: APIKeys.apple,
        });
      } else {
        Purchases.configure({
          apiKey: APIKeys.google,
        });
      }
      setIsReady(true);
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      Purchases.addCustomerInfoUpdateListener(async (customerInfo) => {
        updateCustumerInformation(customerInfo);
      });
      await loadOfferings();
    };

    init();
  }, []);

  const loadOfferings = async () => {
    const offerings = await Purchases.getOfferings();

    if (offerings.current) {
      console.log('offerings', offerings);
      setPackages(offerings.current.availablePackages);
    }
  };

  const updateCustumerInformation = async (customerInfo: CustomerInfo) => {
    console.log('customerInfo', customerInfo);
    const newUser: UserState = {
      dalle: user.dalle,
    };
    if (customerInfo.entitlements.active['DALLE'] !== undefined) {
      newUser.dalle = true;
    }
    setUser(newUser);
  };

  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      console.log('Purchasing:', pack.identifier);
      await Purchases.purchasePackage(pack);

      if (pack.identifier === 'dalle') {
        setUser({ dalle: true });
        console.log('Purchased:', pack.identifier);
        Alert.alert('Success', 'You have purchased the DALL·E package');
      }
    } catch (error: any) {
      console.error('Purchase Error:', error);
      if (!error.userCancelled) {
        Alert.alert('Error', 'An error occurred while purchasing the package');
      }
    }
  };

  const restorePermissions = async () => {
    const customer = await Purchases.restorePurchases();
    return customer;
  };

  const value = {
    purchasePackage,
    restorePermissions,
    user,
    packages,
  };
  if (!isReady) return <></>;

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};
