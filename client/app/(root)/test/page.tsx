'use client';

import { Flex, Text, Button } from '@radix-ui/themes';
import axios from 'axios';
import { getCookie } from '@/lib/utils/getCookie';
import {v4} from "uuid";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const getAuthToken = async () => {
    let result: string | null = '';

    getCookie('authToken').then((res) => {
        result = res;
    });

    return result;
};
export default function MyApp() {
    return (
        <Flex direction="column" gap="3">
            <Text>Hello from Radix Themes :)</Text>
            <Button
                onClick={() => {
                    console.log(v4())
                }}
                color="bronze"
                variant="solid"
                size={'3'}
                className="text-black"
            >
                go
            </Button>
        </Flex>
    );
}
