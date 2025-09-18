import { QueryKey, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "./use-toast";

export type UseFetchDataParams<TData = any, _ = any, TSelected = any> = {
	queryKey: QueryKey;
	queryFn: () => Promise<TData>;
	enableCondition?: boolean;
	refetchOnMount?: boolean;
	retry?: number;
	onSuccessFn?: (data: TSelected) => void;
	onErrorFn?: (errorMessage: string) => void;
	selectFn?: (data: TData) => TSelected;
};

export const useFetchData = <TData = any, TError = any, TSelected = TData>({
	queryKey,
	queryFn,
	enableCondition = true,
	refetchOnMount,
	selectFn,
	onErrorFn,
	onSuccessFn,
	retry,
}: UseFetchDataParams<TData, TError, TSelected>) => {
	const { toast } = useToast();
	const data = useQuery<TData, TError, TSelected>({
		queryKey,
		queryFn,
		refetchOnWindowFocus: false,
		refetchOnMount: refetchOnMount ?? true,
		retry: retry ?? 1,
		enabled: enableCondition,

		select: (data: TData) => {
			if (selectFn) {
				return selectFn(data);
			}
			return data as any;
		},
	});
	useEffect(() => {
		if (data?.isError) {
			toast({ title: (data.error as Error)?.message, variant: "destructive" });
			onErrorFn && onErrorFn((data.error as Error)?.message);
		}
	}, [data?.isError]);
	useEffect(() => {
		onSuccessFn && data?.isSuccess && onSuccessFn(data?.data as TSelected);
	}, [data?.isSuccess, data?.data]);

	return data;
};
