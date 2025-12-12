'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Check, Activity, Cpu, Sparkles, FileVideo } from 'lucide-react'
import Link from 'next/link'

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [processingStep, setProcessingStep] = useState(0) // 0: Idle, 1: Uploading, 2: AI Extract, 3: Minting, 4: Done

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const startProcessing = () => {
        // Simulate flow
        setProcessingStep(1)
        setTimeout(() => setProcessingStep(2), 2000)
        setTimeout(() => setProcessingStep(3), 5000)
        setTimeout(() => setProcessingStep(4), 8000)
    }

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-4 relative">
            {/* Background Mesh (Global CSS handles body, this mimics local depth) */}

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">New IP Asset</h1>
                        <p className="text-muted-foreground">Upload raw video to extract and mint motion data.</p>
                    </div>
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10"><X className="w-5 h-5" /></Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Upload Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Drag & Drop Zone */}
                        <div
                            className={`
                relative h-96 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8
                ${dragActive ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(94,85,255,0.3)]' : 'border-white/10 bg-white/5 hover:bg-white/10'}
                ${file ? 'border-secondary/50 bg-black/40' : ''}
              `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                                onChange={handleChange}
                                accept="video/*"
                            />

                            {!file ? (
                                <>
                                    <div className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 transition-transform ${dragActive ? 'scale-110' : ''}`}>
                                        <Upload className={`w-10 h-10 ${dragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Drag video here</h3>
                                    <p className="text-sm text-muted-foreground text-center max-w-xs">
                                        Supports .MP4, .MOV (Max 500MB). <br /> AI will automatically extract skeletal rig.
                                    </p>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                                    {/* Creating a video preview or just file icon */}
                                    <FileVideo className="w-16 h-16 text-secondary mb-4" />
                                    <p className="text-lg font-medium">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                                    {/* Remove button could go here */}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end pt-4">
                            <Button
                                size="lg"
                                disabled={!file || processingStep > 0}
                                onClick={startProcessing}
                                className="rounded-full px-12 h-14 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(94,85,255,0.4)] disabled:opacity-50"
                            >
                                {processingStep === 0 ? 'Start Processing' : 'Processing...'}
                            </Button>
                        </div>
                    </div>

                    {/* Right: Processing Status Panel */}
                    <div className="glass rounded-3xl p-6 h-fit space-y-8">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Activity className="w-5 h-5 text-secondary" />
                            AI Pipeline
                        </h3>

                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10" />

                            {[
                                { title: "Upload Video", desc: "Secure IPFS Transfer", icon: Upload },
                                { title: "Extract Pose", desc: "Computer Vision Analysis", icon: Activity },
                                { title: "Auto-Rigging", desc: "Skeleton mapping", icon: Cpu },
                                { title: "Mint IP-NFT", desc: "Story Protocol Registration", icon: Sparkles },
                            ].map((step, i) => {
                                const isActive = processingStep === i + 1;
                                const isDone = processingStep > i + 1;

                                return (
                                    <div key={i} className={`relative flex gap-4 transition-opacity duration-500 ${processingStep > 0 ? 'opacity-100' : 'opacity-40'}`}>
                                        <div className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${isDone ? 'bg-secondary border-secondary text-black' : isActive ? 'bg-black border-secondary text-secondary shadow-[0_0_15px_rgba(0,224,255,0.5)]' : 'bg-black border-white/20 text-muted-foreground'}
                    `}>
                                            {isDone ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                        </div>
                                        <div className="pt-1">
                                            <p className={`font-bold transition-colors ${isActive || isDone ? 'text-white' : 'text-muted-foreground'}`}>{step.title}</p>
                                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                                            {isActive && (
                                                <div className="mt-2 h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-secondary animate-progress-indeterminate" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {processingStep === 4 && (
                            <div className="pt-6 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-500">
                                <Button className="w-full rounded-2xl bg-secondary text-black hover:bg-secondary/90 font-bold h-12">
                                    View Minted Asset
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}
