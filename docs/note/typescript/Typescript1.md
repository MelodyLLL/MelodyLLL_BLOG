# typescript常量定义

```typescript
export type Type ='type'


export const Type: {
  [key in ActivityTabType]: { code: key; desc: string; path: string };
} = {
  type: {
    code: 'type',
    desc: '类型',
  },
};

//export type Type =  keyof typeof Type;
```
```typescript
export const Type = {
  get NON_TYPE() {
    return {
      code: 'NON_TYPE' as const,
      desc: '未分类',
    };
  },
};

export type Type = typeof AppType[keyof typeof Type]['code'];

export function getTypeDesc(key: Type) {
  const obj = Type[key];
  return obj ? obj.desc : key;
}

```

这种还可以返回组件
```typescript
export type Type = 'INIT'

export const Type = (
  status: Type,
): {
  desc: string;
  badge: React.ReactNode;
} => {
  switch (status) {
    case 'INIT': {
      const text = '待填写';
      return {
        desc: text,
        badge: <Badge color="gray" text={text} />,
      };
    }

    default: {
      const exhaustiveCheck: { desc: never; badge: React.ReactNode } = {
        desc: status,
        badge: <Badge color="gray" text="状态未知" />,
      };
      return exhaustiveCheck;
    }
  }
};
```
