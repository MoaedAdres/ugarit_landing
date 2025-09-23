"use client";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import SortableCaseStudyCard from "./SortableCaseStudyCard";
import DragOverlayCard from "./DragOverlayCard";
import { CaseStudyData } from "./types";

interface CaseStudiesGridProps {
    caseStudies: CaseStudyData[];
    onCaseStudiesChange: (caseStudies: CaseStudyData[] | ((prev: CaseStudyData[]) => CaseStudyData[])) => void;
    onDeleteCaseStudy?: (caseStudyId: string) => void;
}

export default function CaseStudiesGrid({ caseStudies, onCaseStudiesChange, onDeleteCaseStudy }: CaseStudiesGridProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && active.id !== over.id) {
            onCaseStudiesChange((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={caseStudies.map((cs) => cs.id)} strategy={rectSortingStrategy}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {caseStudies.map((caseStudy) => (
                        <SortableCaseStudyCard 
                            key={caseStudy.id} 
                            {...caseStudy} 
                            onDelete={onDeleteCaseStudy}
                        />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeId ? <DragOverlayCard caseStudy={caseStudies.find((cs) => cs.id === activeId)!} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
