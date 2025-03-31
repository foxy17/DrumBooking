import type { STATUS } from '@/utils/constants';

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
