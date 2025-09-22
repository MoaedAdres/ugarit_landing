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
import SortableSectionCard from "./SortableSectionCard";
import DragOverlayCard from "./DragOverlayCard";
import { SectionData } from "./types";

interface SectionsGridProps {
	sections: SectionData[];
	onSectionsChange: (sections: SectionData[] | ((prev: SectionData[]) => SectionData[])) => void;
	onToggleSection: (sectionId: string) => void;
	isToggling?: boolean;
}

export default function SectionsGrid({ sections, onSectionsChange, onToggleSection, isToggling = false }: SectionsGridProps) {
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
			onSectionsChange((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<SortableContext items={sections.map((s) => s.id)} strategy={rectSortingStrategy}>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{sections.map((section) => (
						<SortableSectionCard key={section.id} {...section} onToggle={onToggleSection} isToggling={isToggling} />
					))}
				</div>
			</SortableContext>
			<DragOverlay>{activeId ? <DragOverlayCard section={sections.find((s) => s.id === activeId)!} /> : null}</DragOverlay>
		</DndContext>
	);
}
