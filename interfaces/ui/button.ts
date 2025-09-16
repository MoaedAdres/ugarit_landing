import React from "react";

export interface IAnimatedButtonProps {
	text: string;
}

export interface IMyButton {
	text?: string;
	Icon?: any;
	size?: "default" | "sm" | "lg" | "icon" | null;
	variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
	classes?: string;
	iconClasses?: string;
}
