import { ActionError } from "@/api/types/error";
import { messages } from "@/constants/messages";
import { actionClient } from "@/lib/safe-action";
import { homeRepository } from "@/api/services/dashboard/home";
import { addSectionSchema, updateSectionSchema } from "@/api/services/dashboard/home/schemas";
import { z } from "zod";

export const addSectionAction = actionClient.inputSchema(addSectionSchema).action(async ({ parsedInput: data }) => {
    try {
        console.log("in before api data ", data);
        const response = await homeRepository.addSection(data);
        console.log("in action addSectionAction");
        console.log("response", response);
        return response;
    } catch (error) {
        console.log("error", error);
        throw new ActionError(messages.error.server.unavailable);
    }
});

export const updateSectionAction = actionClient
    .inputSchema(
        z.object({
            sectionId: z.number(),
            data: updateSectionSchema,
        })
    )
    .action(async ({ parsedInput: { sectionId, data } }) => {
        try {
            const response = await homeRepository.updateSection(sectionId, data);
            console.log("update response", response);
            return response;
        } catch (error) {
            console.log("update error", error);
            throw new ActionError(messages.error.server.unavailable);
        }
    });

export const deleteSectionAction = actionClient
    .inputSchema(z.object({ sectionId: z.number() }))
    .action(async ({ parsedInput: { sectionId } }) => {
        try {
            const response = await homeRepository.deleteSection(sectionId);
            console.log("delete response", response);
            return response;
        } catch (error) {
            console.log("delete error", error);
            throw new ActionError(messages.error.server.unavailable);
        }
    });