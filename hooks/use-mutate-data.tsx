import { downloadFileFromBinary } from "@/utils/helperFunctions";
import { InvalidateQueryFilters, MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UseMutateDataOptions<TData = any, TVariables = any, TError = any, TContext = any> = {
	mutationFn: MutationFunction<TData, TVariables>;
	mutationKey?: MutationKey;
	invalidateKeys?: InvalidateQueryFilters[]; // QueryKey[] is valid for invalidation
	displaySuccess?: boolean; // Whether to display a success message
	navigateToPath?: string; // Path to navigate after success
	onSuccessFn?: (data: TData, variables: TVariables) => void; // Custom onSuccess handler
	onErrorFn?: (errorMessage: TError, variables: TVariables, context?: TContext) => void; // Custom onError handler
	dispatch?: boolean; // Whether to dispatch an action
	action?: (data: TData) => any; // Redux action creator
	downloadFile?: boolean;
	mimeType?: string;
	fileName?: string;
	// New optimistic update handlers
	onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
	onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => Promise<void> | void;
};

export const useMutateData = <TData = any, TVariables = any, TError = any, TContext = any>(
	options: UseMutateDataOptions<TData, TVariables, TError, TContext>
) => {
	const queryClient = useQueryClient();
	const data = useMutation<TData, TError, TVariables, TContext>({
		mutationFn: options.mutationFn,
		mutationKey: options.mutationKey,
		onMutate: options.onMutate,
		onSuccess: (data, variables) => {
			const responseData = data as any;
			console.log("ppppppppppppppppp", data);

			if (
				responseData?.data?.status === 0 ||
				responseData?.data?.code == 500 ||
				responseData?.data?.code == 404 ||
				responseData?.data?.code == 403
			) {
				console.log("data?.data?.msg", responseData?.data?.msg);
				typeof responseData?.data?.msg == "string"
					? toast.error(responseData?.data?.msg)
					: responseData?.data?.msg?.map((message: any) => toast.error(message));
				options.onErrorFn && options.onErrorFn(responseData?.data ?? responseData, variables);
			} else {
				// Invalidate specified queries
				if (options.invalidateKeys) {
					options.invalidateKeys.forEach((key: any) => queryClient.invalidateQueries(key));
				}
				// Display success message if applicable
				if (options.displaySuccess) {
					console.log("success");

					((data as any)?.data?.message || (data as any)?.data?.msg) && toast((data as any)?.data?.message || (data as any)?.data?.msg);
					((data as any)?.message || (data as any)?.msg) && toast((data as any)?.msg || (data as any)?.message);
				}

				// Call custom onSuccess function
				if (options.onSuccessFn) {
					options.onSuccessFn(data, variables);
				}
				if (options.downloadFile) {
					downloadFileFromBinary({
						binaryFile: (data as any)?.data,
						mimeType: (data as any)?.data?.type ?? (variables as any)?.mimeType ?? options.mimeType,
						fileName: (variables as any)?.fileName ?? options.fileName,
						toast: toast,
					});
				}
			}
			// Dispatch Redux action if specified
			// if (options.dispatch && options.action) {
			//   dispatch(options.action(data));
			// }
		},
		onError: (error: TError, variables: TVariables, context?: TContext) => {
			console.log("in onError mutation", error);
			// Display error message
			if ((error as any).status_code == 400) {
				(error as any)?.message.map((field: { errors: string[]; field: string }) => {
					field.errors?.map((error) => {
						toast(field.field, {
							description: error,
						});
						console.log("asd111");
					});
				});
				// Call custom onError function
			} else if (options.onErrorFn) {
				options.onErrorFn((error as any)?.message ?? "Error", variables, context);
			} else toast((error as any)?.message || (error as any)?.msg || "An error occurred");
		},
		onSettled: options.onSettled,
	});

	return data;
};
