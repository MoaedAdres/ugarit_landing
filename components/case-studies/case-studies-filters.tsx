"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const industries = ["All", "Retail", "Financial Services", "Healthcare", "Manufacturing", "Technology", "Education"]

const tags = ["Cloud Migration", "DevOps", "Security", "Cost Reduction", "Performance", "Automation"]

export function CaseStudiesFilters() {
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Industry Filter */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Filter by Industry</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedIndustry(industry)}
                  className="rounded-full"
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Filter by Solution</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedIndustry !== "All" || selectedTags.length > 0) && (
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedIndustry !== "All" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedIndustry}
                  <button onClick={() => setSelectedIndustry("All")} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-destructive">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
