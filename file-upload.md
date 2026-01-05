## FILE UPLOAD IN LENDBOX

```
"use client";

import { CommandItem } from "@/components/ui/command";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  CalendarIcon,
  DollarSign,
  Plus,
  Trash2,
  User,
  Shield,
  Check,
  ChevronsUpDown,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCreateLoan, useUpdateLoan } from "@/hooks/useLoans";
import { useLoanProducts } from "@/hooks/useLoanProducts";
import { useBorrowers } from "@/hooks/useBorrowers";
import { Dropzone, type FileWithMetadata } from "@/components/ui/dropzone";
import {
  LOAN_FEE_TYPES,
  COLLATERAL_TYPES,
  type LoanWithRelations,
  type LoanFeeFormData,
  type LoanCollateralFormData,
} from "@/types/loan";
import { cn } from "@/lib/utils";
// CHANGE: Import new types and calculations for flat rate loans
import {
  VEHICLE_TYPES,
  LOAN_PERIODS,
  FIXED_INTEREST_RATE,
  calculateFlatRateLoan,
  type FlatRateLoanCalculation,
} from "@/lib/loan-calculations";

// CHANGE: Simplified validation schema for flat rate loans
const LoanSchema = z.object({
  borrowerId: z.string().min(1, "Borrower is required"),
  loanProductId: z.string().optional(),
  vehiclePrice: z.string().min(1, "Vehicle cash price is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  downPayment: z.string().optional(),
  loanPeriodMonths: z.string().min(1, "Loan period is required"),
  disbursementDate: z.string().optional(),
  disbursementAccountId: z.string().optional(),
  notes: z.string().optional(),
});

type LoanFormData = z.infer<typeof LoanSchema>;

interface LoanFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: LoanWithRelations | null;
  branchId: string;
}

export default function LoanForm({
  isOpen,
  onClose,
  initialData,
  branchId,
}: LoanFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [fees, setFees] = useState<LoanFeeFormData[]>([]);
  const [collateral, setCollateral] = useState<LoanCollateralFormData[]>([]);
  const [collateralFiles, setCollateralFiles] = useState<{
    [key: number]: FileWithMetadata[];
  }>({});
  const [calculatedDetails, setCalculatedDetails] =
    useState<FlatRateLoanCalculation | null>(null);
  const [borrowerOpen, setBorrowerOpen] = useState(false);
  const [loanProductOpen, setLoanProductOpen] = useState(false);
  const [disbursementDateOpen, setDisbursementDateOpen] = useState(false);

  const createMutation = useCreateLoan();
  const updateMutation = useUpdateLoan();
  const { loanProducts } = useLoanProducts(undefined, undefined, true);
  const { borrowers } = useBorrowers(branchId);

  const form = useForm<LoanFormData>({
    resolver: zodResolver(LoanSchema),
    defaultValues: {
      borrowerId: "",
      loanProductId: "",
      vehiclePrice: "",
      vehicleType: "motorcycle", // Set motorcycle as default
      downPayment: "0",
      loanPeriodMonths: "12", // Already set to 12 months as default
      disbursementDate: "",
      disbursementAccountId: "",
      notes: "",
    },
  });

  const vehiclePrice = form.watch("vehiclePrice");
  const vehicleType = form.watch("vehicleType");
  const downPayment = form.watch("downPayment");
  const loanPeriodMonths = form.watch("loanPeriodMonths");

  // ==================== CALCULATE LOAN DETAILS ====================
  useEffect(() => {
    const price = Number.parseFloat(vehiclePrice);
    const deposit = Number.parseFloat(downPayment || "0");
    const periodMonths = Number.parseInt(loanPeriodMonths);
    const vehicleTypeFee =
      VEHICLE_TYPES.find((v) => v.value === vehicleType)?.fee || 0;

    if (price > 0 && vehicleTypeFee > 0 && periodMonths > 0) {
      const details = calculateFlatRateLoan(
        price,
        vehicleTypeFee,
        deposit,
        periodMonths
      );
      setCalculatedDetails(details);
    } else {
      setCalculatedDetails(null);
    }
  }, [vehiclePrice, vehicleType, downPayment, loanPeriodMonths]);

  // ==================== LOAN PRODUCT SELECTION ====================
  const handleLoanProductChange = (productId: string) => {
    // Optional: Can still link to loan product for tracking purposes
    // but don't auto-fill interest rates or terms
  };

  // ==================== FEES HANDLERS ====================
  const addFee = () => {
    setFees([
      ...fees,
      {
        name: "",
        feeType: "processing",
        amount: "",
        deductedFromPrincipal: false,
        isPaid: false,
      },
    ]);
  };

  const removeFee = (index: number) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const updateFee = (
    index: number,
    field: keyof LoanFeeFormData,
    value: any
  ) => {
    const updated = [...fees];
    updated[index] = { ...updated[index], [field]: value };
    setFees(updated);
  };

  // ==================== COLLATERAL HANDLERS ====================
  const addCollateral = () => {
    console.log("Adding collateral"); // Add this to see if it's called multiple times
    setCollateral((prev) => [
      ...prev,
      {
        type: "vehicle",
        description: "",
        estimatedValue: "",
        documents: [],
      },
    ]);
  };

  const removeCollateral = (index: number) => {
    const updatedCollateral = collateral.filter((_, i) => i !== index);
    setCollateral(updatedCollateral);

    // Remove associated files
    const updatedFiles = { ...collateralFiles };
    delete updatedFiles[index];
    setCollateralFiles(updatedFiles);
  };

  const updateCollateral = (
    index: number,
    field: keyof LoanCollateralFormData,
    value: any
  ) => {
    const updated = [...collateral];
    updated[index] = { ...updated[index], [field]: value };
    setCollateral(updated);
  };

  // Handle file upload for specific collateral item - FIXED VERSION
  // FIXED: Handle file upload for specific collateral item
  const handleCollateralFilesChange = useCallback(
    (index: number, files: FileWithMetadata[]) => {
      // Only update if files actually changed to prevent unnecessary re-renders
      setCollateralFiles((prev) => {
        const currentFiles = prev[index] || [];

        // Check if files actually changed to avoid infinite loops
        if (JSON.stringify(currentFiles) === JSON.stringify(files)) {
          return prev;
        }

        return {
          ...prev,
          [index]: files,
        };
      });
    },
    []
  );

  // ==================== RESET HANDLER ====================
  const handleFormReset = useCallback(() => {
    form.reset();
    setFees([]);
    setCollateral([]);
    setCollateralFiles({});
    setCalculatedDetails(null);
    setActiveTab("basic");
    setBorrowerOpen(false);
    setLoanProductOpen(false);
    setDisbursementDateOpen(false); // Reset disbursement date picker state
  }, [form]);

  // ==================== INITIALIZE FORM ====================
  useEffect(() => {
    if (isOpen && initialData) {
      form.reset({
        borrowerId: initialData.borrowerId || "",
        loanProductId: initialData.loanProductId || "",
        vehiclePrice: initialData.principalAmount.toString() || "", // Maps to vehiclePrice
        vehicleType: initialData.vehicleType || "", // New field
        downPayment: initialData.initialDeposit?.toString() || "0", // Maps to downPayment
        loanPeriodMonths: initialData.duration.toString() || "12", // Maps to loanPeriodMonths
        disbursementDate: initialData.disbursementDate
          ? new Date(initialData.disbursementDate).toISOString().split("T")[0]
          : "",
        disbursementAccountId: initialData.disbursementAccountId || "",
        notes: initialData.notes || "",
      });

      // Load fees
      if (initialData.fees) {
        setFees(
          initialData.fees.map((fee) => ({
            id: fee.id,
            name: fee.name,
            feeType: fee.feeType,
            amount: fee.amount.toString(),
            deductedFromPrincipal: fee.deductedFromPrincipal,
            isPaid: fee.isPaid,
          }))
        );
      }

      // Load collateral
      if (initialData.collateral) {
        const collateralData = initialData.collateral.map((col) => ({
          id: col.id,
          type: col.type,
          description: col.description,
          estimatedValue: col.estimatedValue.toString(),
          documents: col.documents || [],
        }));
        setCollateral(collateralData);

        // Initialize collateral files for existing documents
        const filesMap: { [key: number]: FileWithMetadata[] } = {};
        collateralData.forEach((col, index) => {
          if (col.documents && col.documents.length > 0) {
            filesMap[index] = col.documents.map((doc) => ({
              id: doc.id || `existing-${index}-${doc.fileName}`,
              file: new File([], doc.fileName), // Create dummy file object
              uploading: false,
              progress: 100,
              isDeleting: false,
              error: false,
              publicUrl: doc.fileUrl,
              key: doc.fileUrl.split("/").pop(), // Extract key from URL
            }));
          }
        });
        setCollateralFiles(filesMap);
      }
    } else if (isOpen && !initialData) {
      handleFormReset();
    }
  }, [isOpen, initialData, form, handleFormReset]);

  // ==================== SUBMIT HANDLER ====================
  const onSubmit = async (data: LoanFormData) => {
    // Validate fees
    for (let i = 0; i < fees.length; i++) {
      const fee = fees[i];
      if (!fee.name.trim() || !fee.amount.trim()) {
        setActiveTab("fees");
        return;
      }
    }

    // Validate collateral
    for (let i = 0; i < collateral.length; i++) {
      const col = collateral[i];
      if (!col.description.trim() || !col.estimatedValue.trim()) {
        setActiveTab("collateral");
        return;
      }
    }

    try {
      const vehicleTypeFee =
        VEHICLE_TYPES.find((v) => v.value === data.vehicleType)?.fee || 0;
      const price = Number.parseFloat(data.vehiclePrice);
      const deposit = Number.parseFloat(data.downPayment || "0");
      const periodMonths = Number.parseInt(data.loanPeriodMonths);

      // Calculate using flat rate formula
      const calculation = calculateFlatRateLoan(
        price,
        vehicleTypeFee,
        deposit,
        periodMonths
      );

      const loanData: any = {
        borrowerId: data.borrowerId,
        branchId,
        loanProductId: data.loanProductId || null,
        principalAmount: calculation.totalPrincipal, // This is now the vehicle price + fee
        vehicleType: data.vehicleType,
        vehicleTypeFee: vehicleTypeFee,
        initialDeposit: deposit, // This is the down payment
        duration: periodMonths,
        durationUnit: "months", // Fixed for this loan type
        interestMethod: "flat_rate", // Fixed for this loan type
        interestRate: FIXED_INTEREST_RATE * 100, // Store as percentage
        repaymentCycle: "weekly", // Fixed for this loan type
        totalFinanced: calculation.financed, // Principal - downPayment
        totalInterest: calculation.interestAmount,
        totalRepayment: calculation.totalRepayment,
        weeklyPayment: calculation.weeklyPayment,
        monthlyPayment: calculation.monthlyPayment, // Added for completeness, but weekly is primary
        disbursementDate: data.disbursementDate
          ? new Date(data.disbursementDate)
          : null,
        disbursementAccountId: data.disbursementAccountId || null,
        notes: data.notes || null,
      };

      // Add fees
      if (fees.length > 0) {
        loanData.fees = fees.map((fee) => ({
          ...(fee.id && { id: fee.id }), // Only include id for updates
          name: fee.name,
          feeType: fee.feeType,
          amount: Number.parseFloat(fee.amount),
          deductedFromPrincipal: fee.deductedFromPrincipal,
          isPaid: fee.isPaid,
        }));
      }

      // Add collateral
      // Add collateral with documents from both collateral state and collateralFiles
      if (collateral.length > 0) {
        loanData.collateral = collateral.map((col, index) => {
          const files = collateralFiles[index] || [];
          const documentsFromFiles = files
            .filter((f) => f.publicUrl && !f.uploading && !f.error)
            .map((f) => ({
              fileName: f.file.name,
              fileUrl: f.publicUrl!,
              fileSize: f.file.size,
              mimeType: f.file.type,
            }));

          // Combine existing documents with new ones from files
          const allDocuments = [
            ...(col.documents || []),
            ...documentsFromFiles,
          ];

          return {
            ...(col.id && { id: col.id }),
            type: col.type,
            description: col.description,
            estimatedValue: Number.parseFloat(col.estimatedValue),
            documents: allDocuments,
          };
        });
      }

      if (initialData) {
        // UPDATE MODE
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: loanData,
        });
      } else {
        // CREATE MODE
        await createMutation.mutateAsync(loanData);
      }

      handleFormReset();
      onClose();
    } catch (error) {
      console.error("Failed to save loan:", error);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Get selected borrower and loan product for display
  const selectedBorrower = useMemo(() => {
    const borrowerId = form.watch("borrowerId");
    return borrowers.find((b) => b.id === borrowerId);
  }, [form.watch("borrowerId"), borrowers]);

  const selectedLoanProduct = useMemo(() => {
    const loanProductId = form.watch("loanProductId");
    return loanProducts.find((p) => p.id === loanProductId);
  }, [form.watch("loanProductId"), loanProducts]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          handleFormReset();
          onClose();
        }
      }}
    >
      <DialogContent className="lg:max-w-xl max-w-[calc(100%-1rem)] max-h-[95vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl">
            {initialData ? "Edit Loan" : "Create New Loan"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update loan details, fees, and collateral"
              : "Configure a new loan with flat rate calculation"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-6 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Loan Details</TabsTrigger>
              <TabsTrigger value="fees">Fees ({fees.length})</TabsTrigger>
              <TabsTrigger value="collateral">
                Collateral ({collateral.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="max-h-[calc(95vh-220px)]">
            <div className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Basic Details Tab */}
                  <TabsContent value="basic" className="mt-0 space-y-6">
                    {/* Borrower Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">
                        Borrower Information
                      </h3>

                      <FormField
                        control={form.control}
                        name="borrowerId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Select Borrower *
                            </FormLabel>
                            <Popover
                              open={borrowerOpen}
                              onOpenChange={setBorrowerOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={borrowerOpen}
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled={isLoading || !!initialData}
                                  >
                                    {field.value
                                      ? selectedBorrower
                                        ? `${selectedBorrower.firstName} ${selectedBorrower.lastName} - ${selectedBorrower.phone}`
                                        : "Loading..."
                                      : "Select borrower..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search borrowers..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No borrower found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {borrowers.map((borrower) => (
                                        <CommandItem
                                          key={borrower.id}
                                          value={`${borrower.firstName} ${
                                            borrower.lastName
                                          } ${borrower.phone} ${
                                            borrower.email || ""
                                          }`}
                                          onSelect={() => {
                                            form.setValue(
                                              "borrowerId",
                                              borrower.id
                                            );
                                            setBorrowerOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              borrower.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {borrower.firstName}{" "}
                                          {borrower.lastName} - {borrower.phone}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Loan Product Selection - Optional, can be kept for tracking */}
                      <FormField
                        control={form.control}
                        name="loanProductId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Loan Product (Optional)</FormLabel>
                            <Popover
                              open={loanProductOpen}
                              onOpenChange={setLoanProductOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={loanProductOpen}
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled={isLoading}
                                  >
                                    {field.value
                                      ? selectedLoanProduct
                                        ? `${selectedLoanProduct.name} - ${selectedLoanProduct.interestRate}%`
                                        : "Loading..."
                                      : "Select loan product..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search loan products..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No loan product found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {loanProducts.map((product) => (
                                        <CommandItem
                                          key={product.id}
                                          value={`${product.name} ${
                                            product.category || ""
                                          } ${product.interestRate}`}
                                          onSelect={() => {
                                            field.onChange(product.id);
                                            handleLoanProductChange(product.id); // Call handler, but it's simplified now
                                            setLoanProductOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              product.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {product.name} -{" "}
                                          {product.interestRate}%
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription className="text-xs">
                              Selecting a product is optional for this loan type
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">
                        Vehicle & Loan Terms
                      </h3>

                      <FormField
                        control={form.control}
                        name="vehiclePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              Vehicle Cash Price (UGX) *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="5200000"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              The actual price of the vehicle
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {VEHICLE_TYPES.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs">
                              Fixed fee will be added to the vehicle price
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="downPayment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <Wallet className="h-4 w-4" />
                              Down Payment (UGX)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Initial payment from the borrower
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="loanPeriodMonths"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              Loan Term *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {LOAN_PERIODS.map((period) => (
                                  <SelectItem
                                    key={period.value}
                                    value={period.value.toString()}
                                  >
                                    {period.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs">
                              Fixed interest rate of 26% applied
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {calculatedDetails && (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription>
                          <div className="space-y-3">
                            <div className="font-semibold text-blue-900 text-base">
                              Kayula Motors Loan Calculator (Flat Rate)
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              {/* Vehicle Price Breakdown */}
                              <div className="col-span-2 p-3 bg-white rounded-lg border border-blue-200">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Vehicle Cash Price:
                                    </span>
                                    <span className="font-semibold">
                                      {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "UGX",
                                        minimumFractionDigits: 0,
                                      }).format(calculatedDetails.vehiclePrice)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Vehicle Type Fee:
                                    </span>
                                    <span className="font-semibold">
                                      {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "UGX",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        calculatedDetails.vehicleTypeFee
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between pt-2 border-t">
                                    <span className="font-semibold">
                                      Total Price:
                                    </span>
                                    <span className="font-bold text-blue-600">
                                      {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "UGX",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        calculatedDetails.totalPrincipal
                                      )}
                                    </span>
                                  </div>
                                  {calculatedDetails.downPayment > 0 && (
                                    <>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          Down Payment:
                                        </span>
                                        <span className="font-semibold text-green-600">
                                          -
                                          {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "UGX",
                                            minimumFractionDigits: 0,
                                          }).format(
                                            calculatedDetails.downPayment
                                          )}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Total Financed - HIGHLIGHTED */}
                              <div className="col-span-2 p-3 bg-green-50 rounded-lg border-2 border-green-300">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-green-900">
                                    Total Financed
                                  </span>
                                  <span className="text-2xl font-bold text-green-600">
                                    {new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "UGX",
                                      minimumFractionDigits: 0,
                                    }).format(calculatedDetails.financed)}
                                  </span>
                                </div>
                                <div className="text-xs text-green-700 mt-1">
                                  Amount to be paid over{" "}
                                  {calculatedDetails.loanPeriodMonths} months
                                </div>
                              </div>

                              {/* Interest Details */}
                              <div className="p-2 bg-white rounded">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Interest Rate
                                </div>
                                <div className="font-semibold">
                                  {(
                                    calculatedDetails.interestRate * 100
                                  ).toFixed(0)}
                                  % (Fixed)
                                </div>
                              </div>

                              <div className="p-2 bg-white rounded">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Total Interest
                                </div>
                                <div className="font-semibold">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "UGX",
                                    minimumFractionDigits: 0,
                                  }).format(calculatedDetails.interestAmount)}
                                </div>
                              </div>

                              {/* Monthly Payment */}
                              <div className="col-span-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-blue-900">
                                    Monthly Payment
                                  </span>
                                </div>
                                <div className="text-xl font-bold text-blue-600">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "UGX",
                                    minimumFractionDigits: 0,
                                  }).format(calculatedDetails.monthlyPayment)}
                                </div>
                              </div>

                              {/* Weekly Payment - MOST IMPORTANT */}
                              <div className="col-span-2 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-300">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-indigo-900 text-lg">
                                    Weekly Payment
                                  </span>
                                </div>
                                <div className="text-3xl font-bold text-indigo-600">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "UGX",
                                    minimumFractionDigits: 0,
                                  }).format(calculatedDetails.weeklyPayment)}
                                </div>
                                <div className="text-xs text-indigo-700 mt-2">
                                  Payment every week for{" "}
                                  {calculatedDetails.loanPeriodWeeks} weeks
                                </div>
                              </div>

                              {/* Total Repayment */}
                              <div className="col-span-2 p-3 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">
                                      Total Repayment
                                    </div>
                                    <div className="text-xl font-bold text-red-600">
                                      {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "UGX",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        calculatedDetails.totalRepayment
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-muted-foreground mb-1">
                                      Loan Period
                                    </div>
                                    <div className="font-semibold">
                                      {calculatedDetails.loanPeriodMonths}{" "}
                                      months
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      ({calculatedDetails.loanPeriodWeeks}{" "}
                                      weeks)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Payment Schedule Info */}
                            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                              <div className="text-xs font-semibold text-blue-900 mb-1">
                                📅 Payment Schedule
                              </div>
                              <div className="text-sm text-blue-800">
                                First payment due <strong>14 days</strong> after
                                disbursement. Borrower pays{" "}
                                <strong>
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "UGX",
                                    minimumFractionDigits: 0,
                                  }).format(calculatedDetails.weeklyPayment)}
                                </strong>{" "}
                                every week for{" "}
                                {calculatedDetails.loanPeriodWeeks} weeks.
                              </div>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Disbursement */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">
                        Disbursement (Optional)
                      </h3>

                      <FormField
                        control={form.control}
                        name="disbursementDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              Disbursement Date
                            </FormLabel>
                            <Popover
                              open={disbursementDateOpen}
                              onOpenChange={setDisbursementDateOpen}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled={isLoading}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(new Date(field.value), "PPP")
                                    ) : (
                                      <span>Select disbursement date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    if (date) {
                                      field.onChange(
                                        date.toISOString().split("T")[0]
                                      );
                                      form.trigger("disbursementDate");
                                    } else {
                                      field.onChange("");
                                    }
                                    setDisbursementDateOpen(false);
                                  }}
                                  // disabled={(date) => {
                                  //   const today = new Date();
                                  //   today.setHours(0, 0, 0, 0);
                                  //   return date < today;
                                  // }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription className="text-xs">
                              First payment due 14 days after disbursement
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Additional notes about this loan..."
                                rows={3}
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* Fees Tab */}
                  <TabsContent value="fees" className="mt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Loan Fees</h3>
                        <p className="text-sm text-muted-foreground">
                          Add processing fees and other charges
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={addFee}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fee
                      </Button>
                    </div>

                    {fees.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                            <p className="text-muted-foreground mb-4">
                              No fees configured
                            </p>
                            <Button
                              type="button"
                              onClick={addFee}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add First Fee
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {fees.map((fee, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                  Fee #{index + 1}
                                </CardTitle>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFee(index)}
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>Fee Name *</Label>
                                  <Input
                                    placeholder="e.g., Processing Fee"
                                    value={fee.name}
                                    onChange={(e) =>
                                      updateFee(index, "name", e.target.value)
                                    }
                                    disabled={isLoading}
                                  />
                                </div>
                                <div>
                                  <Label>Fee Type *</Label>
                                  <Select
                                    value={fee.feeType}
                                    onValueChange={(value) =>
                                      updateFee(index, "feeType", value)
                                    }
                                    disabled={isLoading}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {LOAN_FEE_TYPES.map((type) => (
                                        <SelectItem
                                          key={type.value}
                                          value={type.value}
                                        >
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label>Amount *</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="100"
                                  value={fee.amount}
                                  onChange={(e) =>
                                    updateFee(index, "amount", e.target.value)
                                  }
                                  disabled={isLoading}
                                />
                              </div>

                              <div className="flex items-center justify-between p-3 border rounded-lg">
                                <Label className="text-sm">
                                  Deduct from Principal
                                </Label>
                                <Switch
                                  checked={fee.deductedFromPrincipal}
                                  onCheckedChange={(checked) =>
                                    updateFee(
                                      index,
                                      "deductedFromPrincipal",
                                      checked
                                    )
                                  }
                                  disabled={isLoading}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Collateral Tab */}
                  <TabsContent value="collateral" className="mt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Loan Collateral
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Add collateral items for this loan
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={addCollateral}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Collateral
                      </Button>
                    </div>

                    {collateral.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-8">
                            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                            <p className="text-muted-foreground mb-4">
                              No collateral configured
                            </p>
                            <Button
                              type="button"
                              onClick={addCollateral}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add First Collateral
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {collateral.map((col, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                  Collateral #{index + 1}
                                </CardTitle>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeCollateral(index)}
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>Collateral Type *</Label>
                                  <Select
                                    value={col.type}
                                    onValueChange={(value) =>
                                      updateCollateral(index, "type", value)
                                    }
                                    disabled={isLoading}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {COLLATERAL_TYPES.map((type) => (
                                        <SelectItem
                                          key={type.value}
                                          value={type.value}
                                        >
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Estimated Value *</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="5000"
                                    value={col.estimatedValue}
                                    onChange={(e) =>
                                      updateCollateral(
                                        index,
                                        "estimatedValue",
                                        e.target.value
                                      )
                                    }
                                    disabled={isLoading}
                                  />
                                </div>
                              </div>

                              <div>
                                <Label>Description *</Label>
                                <Textarea
                                  placeholder="Describe the collateral item (e.g., Toyota Camry 2020, VIN: ...)"
                                  value={col.description}
                                  onChange={(e) =>
                                    updateCollateral(
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  disabled={isLoading}
                                />
                              </div>

                              <div>
                                <Label>Supporting Documents</Label>
                                <Dropzone
                                  provider="aws-s3"
                                  variant="default"
                                  maxFiles={5}
                                  maxSize={1024 * 1024 * 10} // 10MB
                                  accept={{
                                    "image/*": [
                                      ".png",
                                      ".jpg",
                                      ".jpeg",
                                      ".gif",
                                    ],
                                    "application/pdf": [".pdf"],
                                    "application/msword": [".doc"],
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                                      [".docx"],
                                  }}
                                  onFilesChange={(files) =>
                                    handleCollateralFilesChange(index, files)
                                  }
                                  disabled={isLoading}
                                  helperText="Upload photos, ownership documents, or other supporting files (max 5 files, 10MB each)"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4 border-t mt-6">
                    <Button
                      type="submit"
                      className="flex-1 font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? initialData
                          ? "Updating..."
                          : "Creating..."
                        : initialData
                        ? "Update Loan"
                        : "Create Loan"}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => {
                        handleFormReset();
                        onClose();
                      }}
                      variant="outline"
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

```
