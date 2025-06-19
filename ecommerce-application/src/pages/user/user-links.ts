export type UserPageMenuLink = {
    id: string,
    name: string,
    path: string
}

export const userLinks: UserPageMenuLink[] = [
    {
        id: 'settings',
        name: 'Settings',
        path: './settings',
    },
    {
        id: 'address',
        name: 'Address',
        path: './address',
    },
]