export interface DemoGoodsInfo {
  goodsUid: string;
  type?: string;
  status?: string;
  title: string;
  navigateToPath: string;
  image: string;
  description: string;
  price: number;
  url: string;
  tagList: string[];
  extra: string;
  quantity: number;
  shopUid: string;
}

export interface DemoGoodsInfoInput {
  uid?: string;
  goodsUid?: string;
  type?: string;
  status?: string;
  title?: string;
  navigateToPath?: string;
  image?: string;
  description?: string;
  price?: number | string;
  url?: string;
  tagList?: string[] | string;
  extra?: string;
  quantity?: number | string;
  shopUid?: string;
}

export interface DemoShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface DemoOrderInfo {
  navigateToPath: string;
  type: string;
  title: string;
  description: string;
  state: string;
  time: string;
  status: string;
  statusText: string;
  orderUid: string;
  orderTitle: string;
  orderImage: string;
  orderDescription: string;
  orderPrice: number;
  orderUrl: string;
  orderTagList: string[];
  orderExtra: string;
  orderQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  extra: string;
  visitorUid: string;
  shopUid: string;
  shippingAddress: DemoShippingAddress;
}

export interface DemoOrderInfoInput {
  navigateToPath?: string;
  type?: string;
  title?: string;
  description?: string;
  state?: string;
  time?: string;
  status?: string;
  statusText?: string;
  orderUid?: string;
  orderTitle?: string;
  orderImage?: string;
  orderDescription?: string;
  orderPrice?: number | string;
  orderUrl?: string;
  orderTagList?: string[] | string;
  orderExtra?: string;
  orderQuantity?: number | string;
  totalAmount?: number | string;
  paymentMethod?: string;
  extra?: string;
  visitorUid?: string;
  shopUid?: string;
  shippingAddress?: string | Partial<DemoShippingAddress>;
}

export interface LegacyGoodsInfo {
  uid?: string;
  goodsUid?: string;
  title?: string;
  navigateToPath?: string;
  image?: string;
  description?: string;
  price?: number;
  url?: string;
  tagList?: string[];
  extra?: string;
  quantity?: number;
}

export interface LegacyOrderInfoPayload {
  uid?: string;
  visitorUid?: string;
  shopUid?: string;
  navigateToPath?: string;
  time?: string;
  status?: string;
  statusText?: string;
  paymentMethod?: string;
  totalAmount?: number;
  extra?: string;
  shippingName?: string;
  shippingPhone?: string;
  shippingAddress?: Partial<DemoShippingAddress> | string;
  goods?: LegacyGoodsInfo;
}

export const buildGoodsNavigateToPath = (shopUid?: string, goodsUid?: string) => {
  if (!shopUid || !goodsUid) {
    return '';
  }

  return `/pages/goods/detail/index?type=goods&goodsUid=${encodeURIComponent(goodsUid)}&shopUid=${encodeURIComponent(shopUid)}`;
};

export const buildOrderNavigateToPath = (shopUid: string, orderUid: string) => (
  `/pages/order/detail/index?type=order&orderUid=${encodeURIComponent(orderUid)}&shopUid=${encodeURIComponent(shopUid)}`
);

export const parseJsonString = <T,>(value: unknown): T | undefined => {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn('Failed to parse JSON string', error);
      return undefined;
    }
  }

  if (typeof value === 'object') {
    return value as T;
  }

  return undefined;
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const nextValue = Number(value);
    if (Number.isFinite(nextValue)) {
      return nextValue;
    }
  }

  return fallback;
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = parseJsonString<unknown>(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    }
  }

  return [];
};

export const normalizeDemoGoods = (value?: DemoGoodsInfoInput | LegacyGoodsInfo): DemoGoodsInfo | undefined => {
  if (!value) {
    return undefined;
  }

  const goodsUid = String(value.goodsUid || value.uid || '').trim();
  const shopUid = 'shopUid' in value ? String(value.shopUid || '').trim() : '';
  const type = 'type' in value ? value.type : undefined;
  const status = 'status' in value ? value.status : undefined;

  if (!goodsUid) {
    return undefined;
  }

  return {
    goodsUid,
    type: type || 'goods',
    status: status || '',
    title: value.title || goodsUid,
    navigateToPath: value.navigateToPath || buildGoodsNavigateToPath(shopUid, goodsUid),
    image: value.image || '',
    description: value.description || '',
    price: toNumber(value.price, 0),
    url: value.url || '',
    tagList: toStringArray(value.tagList),
    extra: value.extra || '',
    quantity: toNumber(value.quantity, 1),
    shopUid,
  };
};

const normalizeShippingAddress = (
  shippingAddress?: string | Partial<DemoShippingAddress>,
  shippingName?: string,
  shippingPhone?: string,
): DemoShippingAddress => {
  if (typeof shippingAddress === 'string') {
    return {
      name: shippingName || '',
      phone: shippingPhone || '',
      address: shippingAddress,
    };
  }

  return {
    name: shippingAddress?.name || shippingName || '',
    phone: shippingAddress?.phone || shippingPhone || '',
    address: shippingAddress?.address || '',
  };
};

export const normalizeDemoOrder = (value?: DemoOrderInfoInput & LegacyOrderInfoPayload): DemoOrderInfo | undefined => {
  if (!value) {
    return undefined;
  }

  const legacyGoods = value.goods || {};
  const orderUid = String(value.orderUid || value.uid || '').trim();
  const visitorUid = String(value.visitorUid || '').trim();
  const shopUid = String(value.shopUid || '').trim();

  if (!orderUid) {
    return undefined;
  }

  const orderPrice = toNumber(value.orderPrice ?? legacyGoods.price, 0);
  return {
    navigateToPath: value.navigateToPath || (shopUid ? buildOrderNavigateToPath(shopUid, orderUid) : ''),
    type: value.type || 'order',
    title: value.title || value.orderTitle || legacyGoods.title || '',
    description: value.description || value.orderDescription || legacyGoods.description || '',
    state: value.state || value.status || 'pending',
    time: value.time || '',
    status: value.status || value.state || '',
    statusText: value.statusText || value.status || value.state || 'pending',
    orderUid,
    orderTitle: value.orderTitle || legacyGoods.title || orderUid,
    orderImage: value.orderImage || legacyGoods.image || '',
    orderDescription: value.orderDescription || legacyGoods.description || '',
    orderPrice,
    orderUrl: value.orderUrl || legacyGoods.url || '',
    orderTagList: toStringArray(value.orderTagList ?? legacyGoods.tagList),
    orderExtra: value.orderExtra || legacyGoods.extra || '',
    orderQuantity: toNumber(value.orderQuantity ?? legacyGoods.quantity, 1),
    totalAmount: toNumber(value.totalAmount, orderPrice),
    paymentMethod: value.paymentMethod || '',
    extra: value.extra || '',
    visitorUid,
    shopUid,
    shippingAddress: normalizeShippingAddress(value.shippingAddress, value.shippingName, value.shippingPhone),
  };
};